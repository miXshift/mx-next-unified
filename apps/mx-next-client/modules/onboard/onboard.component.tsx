'use client';

import { Button } from '@ui/button';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { logger } from '@utils/logger';
import { useEffect } from 'react';
import { useOnboardStep } from './onboard.hooks';
import {
  STEP_TITLES,
  STEP_DESCRIPTIONS,
  ONBOARDING_STEPS,
} from './onboard.types';
import Logo from '@components/logo';

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export function OnboardContainer({ children }: OnboardingLayoutProps) {
  const {
    currentStep,
    goToPreviousStep,
    goToNextStep,
    goToStep,
    isFirstStep,
    isLastStep,
    isLoading,
  } = useOnboardStep();

  useEffect(() => {
    logger.component('Onboarding layout mounted', 'OnboardingLayout');
    return () => {
      logger.component('Onboarding layout unmounted', 'OnboardingLayout');
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col min-w-screen w-full">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="h-32 flex items-center gap-12 justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <ArrowRight className="h-8 w-8 text-muted-foreground" />
              <h1 className="text-2xl font-bold tracking-tight">Onboarding</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 bg-secondary/30">
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight mb-3">
                {STEP_TITLES[currentStep]}
              </h2>
              <p className="text-lg text-muted-foreground">
                {STEP_DESCRIPTIONS[currentStep]}
              </p>
            </div>

            <div className="bg-card border rounded-xl shadow-sm p-8 transition-all duration-200 hover:shadow-md">
              {children}
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between gap-8">
              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="lg"
                className="min-w-[140px] text-base"
                onClick={goToPreviousStep}
                disabled={isFirstStep}
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Back
              </Button>

              {/* Step Tracker */}
              <div className="flex items-center gap-3">
                {ONBOARDING_STEPS.map((step, index) => {
                  const isActive = step === currentStep;
                  const isCompleted =
                    ONBOARDING_STEPS.indexOf(currentStep) > index;

                  return (
                    <button
                      key={step}
                      onClick={() => goToStep(step)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-primary w-4'
                          : isCompleted
                            ? 'bg-primary/60'
                            : 'bg-muted'
                      }`}
                      title={STEP_TITLES[step]}
                    />
                  );
                })}
              </div>

              <Button
                size="lg"
                className="min-w-[140px] text-base"
                onClick={goToNextStep}
                disabled={isLastStep}
              >
                Next
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
