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
import { Button } from '@ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar';
import { Camera } from 'lucide-react';
import { formFields } from './config';
import { profileFormSchema } from './schema';
import type { ProfileFormData } from './types';
import { useEffect, useState } from 'react';
import { useOnboarding } from '../../onboard.context';
interface ProfileFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

export function ProfileForm({ onValidationChange }: ProfileFormProps) {
  const { formData, updateStepData } = useOnboarding();
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      ...formData['create-profile'],
      firstName: formData['create-profile']?.firstName || '',
      lastName: formData['create-profile']?.lastName || '',
      displayName: formData['create-profile']?.displayName || '',
      jobTitle: formData['create-profile']?.jobTitle || '',
      timezone: formData['create-profile']?.timezone || '',
      agreedToTerms: formData['create-profile']?.agreedToTerms || false,
    },
  });

  useEffect(() => {
    const subscription = form.watch(() => {
      const values = form.getValues();
      const hasErrors = Object.keys(form.formState.errors).length > 0;
      // Check if all required fields are filled
      const isComplete = formFields
        .filter(field => field.required)
        .every(field => !!values[field.id]);

      onValidationChange?.(!hasErrors && isComplete);
      updateStepData('create-profile', values);
    });
    return () => subscription.unsubscribe();
  }, [form, onValidationChange, updateStepData]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('avatar', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
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
            name="avatar"
            render={() => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatarPreview} />
                      <AvatarFallback>
                        {form.getValues('firstName')?.[0]?.toUpperCase() || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full"
                      onClick={() =>
                        document.getElementById('avatar-upload')?.click()
                      }
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
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
                  <Input
                    placeholder={field.placeholder}
                    {...formField}
                    value={String(formField.value || '')}
                  />
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
