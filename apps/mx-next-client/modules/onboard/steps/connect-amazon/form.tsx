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
import { Button } from '@ui/button';
import { Checkbox } from '@ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/card';
import { InfoIcon } from 'lucide-react';
import { amazonConnectionSchema } from './schema';
import type { AmazonConnectionData, AmazonAccount } from './types';
import { useEffect, useState } from 'react';
import { useOnboarding } from '../../onboard.context';

interface AmazonConnectionFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

export function AmazonConnectionForm({
  onValidationChange,
}: AmazonConnectionFormProps) {
  const { formData, updateStepData, goToNextStep } = useOnboarding();
  const [accounts, setAccounts] = useState<AmazonAccount[]>(
    formData['connect-amazon']?.accounts || []
  );

  const form = useForm<AmazonConnectionData>({
    resolver: zodResolver(amazonConnectionSchema),
    mode: 'onChange',
    defaultValues: {
      accountName: formData['connect-amazon']?.accountName || '',
      amazonEmail: formData['connect-amazon']?.amazonEmail || '',
      logoutConfirmed: formData['connect-amazon']?.logoutConfirmed || false,
    },
  });

  const watchLogoutConfirmed = form.watch('logoutConfirmed');
  const watchEmail = form.watch('amazonEmail');
  const emailError = form.formState.errors.amazonEmail;

  // Add this effect for initial validation
  useEffect(() => {
    // Trigger initial validation with saved data
    const values = form.getValues();
    const hasErrors = Object.keys(form.formState.errors).length > 0;

    const isValid =
      typeof values.accountName === 'string' &&
      values.accountName.trim().length > 0 &&
      typeof values.amazonEmail === 'string' &&
      values.amazonEmail.trim().length > 0 &&
      values.logoutConfirmed === true &&
      !hasErrors;

    onValidationChange?.(isValid);

    // Update form data to ensure persistence
    if (formData['connect-amazon']) {
      updateStepData('connect-amazon', values);
    }
  }, []);

  // Update validation when form values change
  useEffect(() => {
    const subscription = form.watch(() => {
      const values = form.getValues();
      const hasErrors = Object.keys(form.formState.errors).length > 0;

      // Add stricter validation
      const isValid =
        typeof values.accountName === 'string' &&
        values.accountName.trim().length > 0 &&
        typeof values.amazonEmail === 'string' &&
        values.amazonEmail.trim().length > 0 &&
        values.logoutConfirmed === true &&
        !hasErrors;

      onValidationChange?.(isValid);
      updateStepData('connect-amazon', values);
    });

    return () => subscription.unsubscribe();
  }, [form, onValidationChange, updateStepData]);

  return (
    <div className="space-y-6">
      {/* Form to connect new account */}
      <Form {...form}>
        <form className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoIcon className="h-5 w-5 text-blue-500" />
                Before you begin
              </CardTitle>
              <CardDescription>
                Please ensure you have administrator access to the Amazon
                account you wish to link. This process will discover all
                associated merchant accounts.
              </CardDescription>
            </CardHeader>
          </Card>

          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. My Amazon Store" {...field} />
                </FormControl>
                <FormDescription>
                  A friendly name to identify this Amazon account
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amazonEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amazon Login Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="xyz.abc@company.com"
                    {...field}
                    className={emailError ? 'border-red-500' : ''}
                  />
                </FormControl>
                <FormDescription>
                  This should be the email associated with your Amazon seller
                  account
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logoutConfirmed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Please LOGOUT from all your active sessions on Amazon,
                    before adding a new Amazon account.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
