import { Button } from '@ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OnboardingStep } from '../onboard.types';
import { ONBOARDING_STEPS, STEP_TITLES } from '../onboard.types';
import Logo from '@/lib/components/logo';

export function StepNavigation({
  currentStep,
}: {
  currentStep: OnboardingStep;
}) {
  return (
    <aside className="-mx-4 md:mx-0 sticky top-0">
      <div className="p-4">
        <Logo />
      </div>
      <nav className="space-y-1">
        {ONBOARDING_STEPS.map((step, index) => {
          const isActive = currentStep === step;
          const isCompleted = ONBOARDING_STEPS.indexOf(currentStep) > index;
          return (
            <div
              key={step}
              className={`flex items-center space-x-3 px-4 py-2 text-sm font-medium ${
                isActive
                  ? 'bg-muted'
                  : isCompleted
                    ? 'text-primary'
                    : 'text-muted-foreground'
              }`}
            >
              <div
                className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-primary' : isCompleted ? 'bg-primary' : 'bg-muted'}`}
              />
              <span>{STEP_TITLES[step]}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export function StepHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col space-y-1 mb-10">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  );
}

export function StepFooter({
  isFirstStep,
  isLastStep,
  currentStep,
  stepValidation: { canSkip = false, isValid },
  canProceed,
  onPrevious,
  onNext,
  onSkip,
}: {
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStep: OnboardingStep;
  stepValidation: {
    canSkip?: boolean;
    isValid: boolean;
  };
  canProceed: () => boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <footer className="border-t sticky bottom-0 bg-background">
      <div className="max-w-4xl flex-1 items-start py-6 mx-auto">
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={onPrevious} disabled={isFirstStep}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <div className="flex gap-2">
            {canSkip && (
              <Button variant="outline" onClick={onSkip}>
                Skip
              </Button>
            )}
            <Button onClick={onNext} disabled={!canProceed()}>
              {isLastStep
                ? 'Complete'
                : currentStep === 'connect-amazon'
                  ? 'Link Account'
                  : 'Next'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
