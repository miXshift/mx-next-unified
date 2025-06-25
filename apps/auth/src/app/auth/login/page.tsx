'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { login, signup, signInWithGoogle } from './actions';
import { useActionState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator
} from '@mixshift/web-ui';

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    quote: "The ability to analyze granular data and segment it in ways that the Amazon UI cannot, has enabled us to prioritize our focus and spend our time on what is actually moving the needle forward for our business.",
    name: "Anders Palmquist",
    role: "Vice President & GM @ ARMR",
    initials: "AP"
  },
  {
    id: 2,
    quote: "This platform has transformed how we approach our marketing campaigns. We have seen a 40% increase in conversion rates since implementing their analytics tools.",
    name: "Sarah Chen",
    role: "Marketing Director @ TechFlow",
    initials: "SC"
  },
  {
    id: 3,
    quote: "The data insights are incredible. We have streamlined our operations and increased productivity by 60%. The interface is intuitive and powerful.",
    name: "Michael Rodriguez",
    role: "Data Analyst @ GrowthLab",
    initials: "MR"
  },
  {
    id: 4,
    quote: "Real-time analytics have been a game changer for our e-commerce business. We can now make data-driven decisions instantly and see immediate results.",
    name: "Emily Watson",
    role: "CEO @ Commerce Pro",
    initials: "EW"
  },
  {
    id: 5,
    quote: "Managing our inventory has never been easier. The predictive analytics help us stay ahead of demand and optimize our supply chain efficiently.",
    name: "David Kim",
    role: "Operations Manager @ DataSync",
    initials: "DK"
  },
  {
    id: 6,
    quote: "The business intelligence features have revolutionized our decision-making process. We are now able to identify trends and opportunities faster than ever.",
    name: "Lisa Thompson",
    role: "Business Intelligence @ RetailMax",
    initials: "LT"
  }
];

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginState, loginAction, loginPending] = useActionState(login, {});
  const [signupState, signupAction, signupPending] = useActionState(signup, {});
  const [
    signInWithGoogleState,
    signInWithGoogleAction,
    signInWithGooglePending,
  ] = useActionState(signInWithGoogle, {});

  const pending = loginPending || signupPending || signInWithGooglePending;
  const message =
    loginState.message ?? signupState.message ?? signInWithGoogleState.message;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 flex items-center justify-center">
      {/* Left Side - Marketing Content */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/3 flex-col justify-center items-center text-white py-12">
        <div className="max-w-md text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {isSignUp ? 'Create an Account' : 'Sign In'}
          </h1>
          <p className="text-emerald-100 mb-8">
            {isSignUp ? 'Join thousands of satisfied users' : 'Welcome back to your dashboard'}
          </p>

        </div>

        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-8 text-center">WHAT OTHERS ARE SAYING?</h2>
          
          {/* Horizontal Stacked Testimonials */}
          <div className="flex gap-6 overflow-x-auto pb-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-emerald-100 border-emerald-200 text-gray-800 max-w-[360px] w-full flex-shrink-0 shadow-lg rounded-xl">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <span className="text-4xl text-emerald-600 font-serif">&quot;</span>
                  </div>
                  <p className="text-base mb-6 leading-relaxed text-gray-700">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-base text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Sign In/Up Form with Background Image */}
      <div className="w-full lg:w-1/2 xl:w-1/3 flex items-center justify-center relative min-h-screen">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')`
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/80 z-20"></div>
      
        <div className="relative z-50 w-full max-w-md">

          <Card className="w-full bg-white shadow-xl border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {isSignUp ? 'Create an Account' : 'Sign In'}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Tab buttons */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    isSignUp 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600'
                  }`}
                >
                  Sign Up
                </button>
                <button 
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    !isSignUp 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600'
                  }`}
                >
                  Sign In
                </button>
              </div>

              {/* Error message */}
              {message && (
                <div className="text-red-600 text-sm text-center" role="alert">
                  {message.text}
                </div>
              )}

              {/* OAuth buttons */}
              <div className="space-y-3">
                <form>
                  <Button 
                    formAction={signInWithGoogleAction}
                    formNoValidate
                    variant="outline" 
                    className="w-full border-gray-300 hover:bg-gray-50"
                    disabled={pending}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
                  </Button>
                </form>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">OR</span>
                </div>
              </div>

              {/* Email/Password form */}
              <form className="space-y-4">
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="pietro.schirano@gmail.com"
                    required 
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="••••••••••••••"
                    required 
                    className="border-gray-300"
                  />
                </div>

                <Button 
                  formAction={isSignUp ? signupAction : loginAction}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={pending}
                >
                  {pending 
                    ? (isSignUp ? 'Creating Account...' : 'Signing in...') 
                    : (isSignUp ? 'Create an Account' : 'Sign In')
                  }
                </Button>
              </form>

              <div className="text-center text-sm text-gray-600">
                {isSignUp ? 'Already have an account? ' : 'Do not have an account? '}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {isSignUp ? 'Sign In' : 'Register'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 