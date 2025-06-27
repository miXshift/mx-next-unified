'use client';

import React from 'react';
import Link from 'next/link';
import { requestPasswordReset } from './actions';
import { useActionState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  H1,
} from '@mixshift/web-ui';

export default function ResetPasswordPage() {
  const [resetState, resetAction, resetPending] = useActionState(
    requestPasswordReset,
    {}
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/60 via-primary/80 to-primary flex items-center justify-center">
      {/* Left Side - Marketing Content */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/3 flex-col justify-center items-center text-white py-12">
        <div className="max-w-md text-center">
          <H1 className="mb-4 text-white">Reset Your Password</H1>
          <p className="text-primary-foreground/80 mb-8">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </p>

          <div className="bg-primary-foreground/90 rounded-xl p-6 text-gray-800 mt-8">
            <div className="mb-4">
              <span className="text-4xl text-primary font-serif">&quot;</span>
            </div>
            <p className="text-base mb-6 leading-relaxed text-gray-700">
              Secure password recovery is essential for maintaining account
              security. Our system ensures your data remains protected
              throughout the reset process.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg">
                MS
              </div>
              <div>
                <p className="font-semibold text-base text-gray-900">
                  MixShift Security
                </p>
                <p className="text-sm text-gray-600">Account Protection Team</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Password Form with Background Image */}
      <div className="w-full lg:w-1/2 xl:w-1/3 flex items-center justify-center relative min-h-screen">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/80 z-20"></div>

        <div className="relative z-50 w-full max-w-md">
          <Card className="w-full bg-white shadow-xl border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Reset Password
              </CardTitle>
              <p className="text-gray-600 text-sm mt-2">
                Enter your email to receive a password reset link
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Error/Success message */}
              {resetState.message && (
                <div
                  className={`text-sm text-center p-3 rounded-full ${
                    resetState.message.type === 'error'
                      ? 'text-red-600 bg-red-50 border border-red-200'
                      : 'text-green-600 bg-green-50 border border-green-200'
                  }`}
                  role="alert"
                >
                  {resetState.message.text}
                </div>
              )}

              {resetState.message?.type === 'success' ? (
                <div className="text-center space-y-4">
                  <div className="text-green-600">
                    <svg
                      className="w-16 h-16 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Check your email for the password reset link.
                  </p>
                  <Link
                    href="/auth/login"
                    className="inline-block w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-full transition-colors text-center"
                  >
                    Return to Login
                  </Link>
                </div>
              ) : (
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="border-gray-300"
                    />
                  </div>

                  <Button
                    formAction={resetAction}
                    className="w-full"
                    disabled={resetPending}
                  >
                    {resetPending ? 'Sending Reset Link...' : 'Send Reset Link'}
                  </Button>

                  <div className="text-center text-sm text-gray-600">
                    Remember your password?{' '}
                    <Link
                      href="/auth/login"
                      className="text-primary hover:text-primary/80 font-medium hover:underline"
                    >
                      Back to Login
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
