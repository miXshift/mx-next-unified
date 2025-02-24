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
} from '@ui/form';
import { Input } from '@ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Button } from '@ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar';
import { Camera } from 'lucide-react';
import { formFields } from './config';
import { organizationFormSchema } from './schema';
import type { OrganizationFormData } from './types';
import { useEffect, useState } from 'react';
import { useOnboarding } from '../../onboard.context';

interface OrganizationFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

export function OrganizationForm({
  onValidationChange,
}: OrganizationFormProps) {
  const { formData, updateStepData } = useOnboarding();
  const [logoPreview, setLogoPreview] = useState<string>('');

  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationFormSchema),
    mode: 'onChange',
    defaultValues: {
      ...formData['create-organization'],
      companyName: formData['create-organization']?.companyName || '',
      companyDisplayName:
        formData['create-organization']?.companyDisplayName || '',
      companyType: formData['create-organization']?.companyType || '',
      agreedToTerms: formData['create-organization']?.agreedToTerms || false,
    },
  });

  useEffect(() => {
    const subscription = form.watch(() => {
      const values = form.getValues();
      const hasErrors = Object.keys(form.formState.errors).length > 0;
      const isComplete = formFields
        .filter(field => field.required)
        .every(field => !!values[field.id]);

      onValidationChange?.(!hasErrors && isComplete);
      updateStepData('create-organization', values);
    });
    return () => subscription.unsubscribe();
  }, [form, onValidationChange, updateStepData]);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('logo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex justify-center mb-6">
          <FormField
            control={form.control}
            name="logo"
            render={() => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={logoPreview} />
                      <AvatarFallback>
                        {form.getValues('companyName')?.[0]?.toUpperCase() ||
                          '?'}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full"
                      onClick={() =>
                        document.getElementById('logo-upload')?.click()
                      }
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {formFields.map(field => (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {field.label}
                  {field.required && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  {field.type === 'select' ? (
                    <Select
                      onValueChange={formField.onChange}
                      defaultValue={String(formField.value || '')}
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
                  ) : (
                    <Input
                      placeholder={field.placeholder}
                      {...formField}
                      value={String(formField.value || '')}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
}
