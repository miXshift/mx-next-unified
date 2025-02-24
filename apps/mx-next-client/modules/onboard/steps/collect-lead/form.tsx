'use client';

import { useForm } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { formFields } from './config';
import { leadFormSchema } from './schema';
import type { LeadFormData } from './types';
import { useEffect } from 'react';
import { useOnboarding } from '../../onboard.context';

interface LeadFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

export function LeadForm({ onValidationChange }: LeadFormProps) {
  const { formData, updateStepData } = useOnboarding();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onChange',
    defaultValues: {
      ...formData['collect-lead'],
    },
  });

  useEffect(() => {
    if (formData['collect-lead']) {
      const values = form.getValues();
      const hasErrors = Object.keys(form.formState.errors).length > 0;

      const isComplete = formFields
        .filter(field => field.required)
        .every(field => {
          const value = values[field.id];
          return value && typeof value === 'string' && value.trim().length > 0;
        });

      const isSourceValid =
        values.source !== 'other' ||
        (values.sourceOther && values.sourceOther.trim().length > 0);

      const isValid = Boolean(!hasErrors && isComplete && isSourceValid);
      onValidationChange?.(isValid);
    }
  }, [formData]);

  const watchSource = form.watch('source');

  useEffect(() => {
    const subscription = form.watch(() => {
      const values = form.getValues();
      const hasErrors = Object.keys(form.formState.errors).length > 0;

      // Check if all required fields are filled AND have valid values
      const isComplete = formFields
        .filter(field => field.required)
        .every(field => {
          const value = values[field.id];
          return value && typeof value === 'string' && value.trim().length > 0;
        });

      // Special handling for source=other
      const isSourceValid =
        values.source !== 'other' ||
        (values.sourceOther && values.sourceOther.trim().length > 0);

      const isValid = Boolean(!hasErrors && isComplete && isSourceValid);
      onValidationChange?.(isValid);
      updateStepData('collect-lead', values);
    });

    return () => subscription.unsubscribe();
  }, [form, onValidationChange, updateStepData]);

  const renderField = (field: (typeof formFields)[number]) => (
    <FormField
      key={field.id}
      control={form.control}
      name={field.id}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">
            {field.label}
            {field.required && <span className="text-destructive">*</span>}
          </FormLabel>
          {field.type === 'select' && (
            <>
              <FormControl>
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {field.id === 'source' && watchSource === 'other' && (
                <FormField
                  control={form.control}
                  name="sourceOther"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormControl>
                        <Input placeholder="Please specify" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}

          {field.type === 'radio' && (
            <FormControl>
              <RadioGroup
                onValueChange={formField.onChange}
                defaultValue={formField.value}
                className="flex flex-col space-y-1"
              >
                {field.options?.map(option => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <label htmlFor={option.value}>{option.label}</label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {field.type === 'input' && (
            <FormControl>
              <Input placeholder={field.placeholder} {...formField} />
            </FormControl>
          )}

          {field.type === 'textarea' && (
            <FormControl>
              <Textarea placeholder={field.placeholder} {...formField} />
            </FormControl>
          )}

          {field.description && (
            <FormDescription>{field.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form className="space-y-6">{formFields.map(renderField)}</form>
    </Form>
  );
}
