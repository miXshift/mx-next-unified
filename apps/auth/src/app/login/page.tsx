"use client";
import { login, signup } from './actions'
import {
  Card, CardContent,
  Button, Input, Label, Avatar, AvatarImage, AvatarFallback, H2, P
} from '@mixshift/web-ui'
import React, { useState } from 'react'

const testimonials = [
  {
    quote: 'The ability to analyze granular data and segment it in ways that the Amazon UI cannot, has enabled us to provide key insights to our clients and foster deeper relationships with our brand partners.',
    name: 'Anders Palmquist',
    title: 'Vice President & GM @ ARMR',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  // Add more testimonials as needed
]

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirectUri?: string }
}) {
  const [tab, setTab] = useState<'signup' | 'signin'>('signup')
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const { redirectUri } = searchParams || {}

  return (
    <div className="flex min-h-screen">
      {/* Left: Marketing/Testimonial */}
      <div className="flex-1 bg-green-500 flex flex-col items-center justify-center px-8 py-12 relative">
        <button className="absolute top-6 left-6 bg-white rounded-full px-4 py-2 text-sm font-medium shadow">← Go Back</button>
        <div className="flex flex-col items-center mb-12">
          <H2 className="text-white mb-2">{tab === 'signup' ? 'Create an Account' : 'Sign In'}</H2>
          <P className="text-white/80 mb-6">{tab === 'signup' ? 'Create an Account' : 'Sign In'}</P>
          <div className="w-40 h-48 bg-green-300 rounded-lg shadow-lg mb-6 relative flex items-center justify-center">
            {/* Placeholder for illustration */}
            <div className="w-32 h-40 bg-green-200 rounded-lg absolute left-4 top-4 z-0" />
            <div className="w-36 h-44 bg-green-400 rounded-lg z-10" />
          </div>
        </div>
        <div className="text-center mb-4 text-white font-semibold text-lg">WHAT OTHERS ARE SAYING?</div>
        <div className="flex gap-4 justify-center items-center w-full max-w-4xl">
          {testimonials.map((t, idx) => (
            <Card key={idx} className={`w-96 transition-all duration-300 ${idx === testimonialIdx ? 'opacity-100 scale-100' : 'opacity-60 scale-95'}`}>
              <CardContent>
                <P className="mb-4">&ldquo;{t.quote}&rdquo;</P>
                <div className="flex items-center gap-3 mt-4">
                  <Avatar>
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Carousel dots */}
        <div className="flex justify-center mt-4 gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === testimonialIdx ? 'bg-white' : 'bg-white/40'}`}
              onClick={() => setTestimonialIdx(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Right: Auth Form */}
      <div className="flex-1 flex items-center justify-center bg-black/10">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <div className="flex flex-col items-center mb-6">
            {/* Logo placeholder */}
            <img src="/favicon.ico" alt="Logo" className="w-12 h-12 mb-2" />
            <H2 className="mb-2">Create an Account</H2>
            <div className="flex gap-2 mb-4">
              <Button variant={tab === 'signup' ? 'default' : 'outline'} onClick={() => setTab('signup')}>Sign Up</Button>
              <Button variant={tab === 'signin' ? 'default' : 'outline'} onClick={() => setTab('signin')}>Sign In</Button>
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-4">
            <Button variant="secondary" className="w-full flex items-center gap-2 justify-center">
              <span className="text-lg">🛒</span> Sign up with Amazon
            </Button>
            <Button variant="secondary" className="w-full flex items-center gap-2 justify-center">
              <span className="text-lg">🌐</span> Sign up with Google
            </Button>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-muted-foreground/30" />
            <span className="mx-2 text-muted-foreground text-xs">OR</span>
            <div className="flex-1 h-px bg-muted-foreground/30" />
          </div>
          <form className="flex flex-col gap-4" action={tab === 'signup' ? signup : login} method="post">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
            {redirectUri && <input type="hidden" name="redirectUri" value={redirectUri} />}
            <Button type="submit" className="w-full mt-2">
              {tab === 'signup' ? 'Create an Account' : 'Sign In'}
            </Button>
          </form>
          <div className="text-center mt-4 text-sm">
            {tab === 'signup' ? (
              <>
                Already have an account?{' '}
                <button className="text-green-600 hover:underline" onClick={() => setTab('signin')}>Sign In</button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <button className="text-green-600 hover:underline" onClick={() => setTab('signup')}>Register</button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}