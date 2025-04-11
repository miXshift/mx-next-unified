'use client';

import { useForm, useFieldArray, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@ui/form';
import { Input } from '@ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Button } from '@ui/button';
import { Plus, X } from 'lucide-react';
import { inviteMembersSchema } from './schema';
import type { InviteMembersData } from './types';
import { roleDescriptions } from './config';
import { useEffect, useState } from 'react';
import { useOnboarding } from '../../onboard.context';
import { FormErrors } from './error-dialog';
import { cn } from '@utils/styling';

interface InviteMembersFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

export function InviteMembersForm({
  onValidationChange,
}: InviteMembersFormProps) {
  const { formData, updateStepData } = useOnboarding();
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  const form = useForm<InviteMembersData>({
    resolver: zodResolver(inviteMembersSchema),
    mode: 'onBlur',
    defaultValues: {
      members: formData['invite-members']?.members || [
        { email: '', role: 'Member' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'members',
  });

  const onError = (errors: any) => {
    const formatted: Record<string, string[]> = {
      'Invalid Fields': [],
    };

    const values = form.getValues();
    Object.entries(errors.members || {}).forEach(
      ([index, fieldErrors]: [string, any]) => {
        const memberNum = Number(index) + 1;
        if (fieldErrors?.email?.message) {
          formatted['Invalid Fields'].push(
            `Member ${memberNum}: "${values.members[Number(index)].email}" is not a valid email`
          );
        }
        if (fieldErrors?.role?.message) {
          formatted['Invalid Fields'].push(
            `Member ${memberNum}: Please select a role`
          );
        }
      }
    );

    setFormErrors(formatted);
  };

  // Single effect to handle both form updates and validation
  useEffect(() => {
    const subscription = form.watch(() => {
      const values = form.getValues();
      updateStepData('invite-members', values);

      // Check form validity without triggering validation
      const hasErrors = Object.keys(form.formState.errors).length > 0;
      onValidationChange?.(!hasErrors);

      if (hasErrors) {
        onError(form.formState.errors);
      } else {
        setFormErrors({});
      }
    });

    return () => subscription.unsubscribe();
  }, [form, updateStepData, onValidationChange]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormErrors errors={formErrors} />

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-4">
              <FormField
                control={form.control}
                name={`members.${index}.email`}
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel className={index === 0 ? '' : 'sr-only'}>
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@company.com"
                        {...field}
                        className={cn(
                          fieldState.error &&
                            'border-destructive focus-visible:ring-destructive'
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`members.${index}.role`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className={index === 0 ? '' : 'sr-only'}>
                      Role
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={cn(
                          fieldState.error &&
                            'border-destructive focus-visible:ring-destructive'
                        )}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(roleDescriptions).map(
                          ([role, desc]) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                disabled={index === 0}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => append({ email: '', role: 'Member' })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>

        <div className="mt-8 space-y-4">
          {Object.entries(roleDescriptions).map(([role, description]) => (
            <div key={role} className="border rounded-lg p-4">
              <h4 className="font-medium">{role}</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </form>
    </Form>
  );
}
