'use client';

import { useState } from 'react';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { cn } from '@utils/styling';
import { signUpAction, signInAction } from '@modules/auth/auth.actions';
import { Chrome } from 'lucide-react';
import Icon from '@/lib/ui/icon';
import { FormMessage, Message } from '@components/form-message';
import { SubmitButton } from '@components/submit-button';
import Link from 'next/link';

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'signin' | 'signup';
  message: Message;
}

export function AuthForm({
  className,
  type = 'signin',
  ...props
}: AuthFormProps) {
  const [formType, setFormType] = useState<'signin' | 'signup'>(type);
  const formAction = formType === 'signin' ? signInAction : signUpAction;
  const message = props.message;
  console.log(formType);
  console.log(formAction.name);

  return (
    <div className={cn('w-full max-w-md mx-auto', className)} {...props}>
      <div className="flex flex-col items-center space-y-6">
        {/* Logo */}
        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {formType === 'signin' ? 'Existing account' : 'Create an account'}
          </h1>
        </div>

        {/* Auth Type Toggle */}
        <div className="bg-muted p-1 rounded-lg grid grid-cols-2 w-48">
          <button
            onClick={() => setFormType('signup')}
            className={cn(
              'px-4 py-2 text-sm rounded-md',
              formType === 'signup'
                ? 'bg-background shadow-sm'
                : 'text-muted-foreground'
            )}
          >
            Sign Up
          </button>
          <button
            onClick={() => setFormType('signin')}
            className={cn(
              'px-4 py-2 text-sm rounded-md',
              formType === 'signin'
                ? 'bg-background shadow-sm'
                : 'text-muted-foreground'
            )}
          >
            Sign In
          </button>
        </div>

        {/* Social Login */}
        <div className="w-full space-y-3">
          <Button
            variant="outline"
            className="w-full bg-[#4285F4] text-white hover:bg-[#4285F4]/90"
          >
            <Chrome className="mr-2 h-4 w-4" />
            {formType === 'signin' ? 'Sign In' : 'Sign Up'} with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        {/* Form */}
        <form className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@gmail.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="****************"
              required
            />
          </div>
          <SubmitButton
            className="w-full bg-[#10B981] hover:bg-[#10B981]/90"
            formAction={formAction}
            pendingText="sending..."
          >
            {formType === 'signin' ? 'Sign In' : 'Sign Up'}
          </SubmitButton>
          <FormMessage message={message} />

          {/* Footer */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Forgot your password?{' '}
            </span>
            <Link
              className="text-[#10B981] hover:underline font-medium"
              href="/forgot-password"
            >
              Reset
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
