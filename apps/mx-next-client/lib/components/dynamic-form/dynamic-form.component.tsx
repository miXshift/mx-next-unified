'use client';

import { useEffect } from 'react';
import { useForm, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@ui/form';
import { Input } from '@ui/input';
import { Textarea } from '@ui/textarea';
import { Checkbox } from '@ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Switch } from '@ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Button } from '@ui/button';
import {
  DynamicFormProps,
  FieldType,
  FormFieldConfig,
  SelectOption,
} from './dynamic-form.types';
import { FileInput } from './components/file-input';
import { AvatarInput } from './components/avatar-input';
import { cn } from '@/lib/utils/styling';

export function DynamicForm<T extends Record<string, any>>({
  config,
  defaultValues,
  onSubmit,
  onCancel,
  onValidationChange,
  isLoading = false,
  className,
}: DynamicFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(config.schema),
    mode: 'onChange',
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // Watch for validation changes
  useEffect(() => {
    const subscription = form.watch(() => {
      if (onValidationChange) {
        const isValid = form.formState.isValid;
        onValidationChange(isValid);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onValidationChange]);

  const handleSubmit = async (data: T) => {
    if (config.onSubmit) {
      await config.onSubmit(data);
    }
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  const renderField = (field: FormFieldConfig<T>) => {
    if (field.hidden) return null;

    // If the field has a custom render function, use it
    if (field.render) {
      return (
        <FormField
          key={String(field.id)}
          control={form.control}
          name={(field.name as any) || String(field.id)}
          render={({ field: formField }) => (
            <FormItem className={cn(config.fieldClassName)}>
              <FormLabel className={cn(config.labelClassName)}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
              {field.render?.({ ...formField, field })}
              {field.helperText && (
                <FormDescription>{field.helperText}</FormDescription>
              )}
              <FormMessage className={cn(config.errorClassName)} />
            </FormItem>
          )}
        />
      );
    }

    // Otherwise, render based on field type
    return (
      <FormField
        key={String(field.id)}
        control={form.control}
        name={(field.name as any) || String(field.id)}
        render={({ field: formField }) => (
          <FormItem className={cn(config.fieldClassName)}>
            <FormLabel className={cn(config.labelClassName)}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            <FormControl>{renderInputByType(field, formField)}</FormControl>
            {field.helperText && (
              <FormDescription>{field.helperText}</FormDescription>
            )}
            <FormMessage className={cn(config.errorClassName)} />
          </FormItem>
        )}
      />
    );
  };

  const renderInputByType = (field: FormFieldConfig<T>, formField: any) => {
    const commonProps = {
      ...formField,
      id: String(field.id),
      placeholder: field.placeholder,
      disabled: field.disabled,
      className: cn(config.inputClassName, field.className),
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <Input
            {...commonProps}
            type={field.type}
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );
      case 'textarea':
        return (
          <Textarea {...commonProps} rows={field.rows} cols={field.cols} />
        );
      case 'select':
        return (
          <Select
            {...commonProps}
            onValueChange={formField.onChange}
            defaultValue={formField.value}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: SelectOption) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'checkbox':
        return (
          <Checkbox
            {...commonProps}
            checked={formField.value}
            onCheckedChange={formField.onChange}
          />
        );
      case 'toggle':
        return (
          <Switch
            {...commonProps}
            checked={formField.value}
            onCheckedChange={formField.onChange}
          />
        );
      case 'radio':
        return (
          <RadioGroup
            {...commonProps}
            onValueChange={formField.onChange}
            defaultValue={formField.value}
          >
            {field.options?.map((option: SelectOption) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${String(field.id)}-${option.value}`}
                />
                <label htmlFor={`${String(field.id)}-${option.value}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'file':
        return (
          <FileInput
            {...commonProps}
            accept={field.accept}
            multiple={field.multiple}
            onChange={formField.onChange}
          />
        );
      case 'avatar':
        return (
          <AvatarInput
            {...commonProps}
            accept={field.accept}
            onChange={formField.onChange}
            fallback={formField.value?.name || ''}
          />
        );
      // Add more field types as needed
      default:
        return <Input {...commonProps} />;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn(config.className, className)}
      >
        {config.title && (
          <h2 className="text-xl font-semibold mb-4">{config.title}</h2>
        )}
        {config.description && (
          <p className="text-gray-500 mb-6">{config.description}</p>
        )}

        <div className="space-y-4">{config.fields.map(renderField)}</div>

        {!config.hideSubmitButton && (
          <div className="flex justify-end space-x-2 mt-6">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className={cn(config.cancelButtonClassName)}
                disabled={isLoading}
              >
                {config.cancelButtonText || 'Cancel'}
              </Button>
            )}

            {config.showReset && (
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className={cn(config.resetButtonClassName)}
                disabled={isLoading}
              >
                {config.resetButtonText || 'Reset'}
              </Button>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(config.submitButtonClassName)}
            >
              {isLoading ? 'Loading...' : config.submitButtonText || 'Submit'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
