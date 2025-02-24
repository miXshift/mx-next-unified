'use client';

import { Button } from '@ui/button';
import { useCallback } from 'react';
import { useOnboarding } from './onboard.context';
import {
  STEP_TITLES,
  STEP_DESCRIPTIONS,
  isStepSkippable,
} from './onboard.types';
import Logo from '@components/logo';
import { LeadForm } from './steps/collect-lead';
import { ProfileForm } from './steps/create-profile';
import { OrganizationForm } from './steps/create-organization';
import { InviteMembersForm } from './steps/invite-members';
import { AmazonConnectionForm } from './steps/connect-amazon';
import { ActivateMerchantsForm } from './steps/activate-merchants';
import { Spinner } from '@/lib/components/spinner';
import { useDialog } from '@/lib/providers/app-provider/dialog-provider';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { useToast } from '@/lib/hooks/use-toasts';
import { StepNavigation, StepHeader, StepFooter } from './components';

const stepComponents = {
  'collect-lead': LeadForm,
  'create-profile': ProfileForm,
  'create-organization': OrganizationForm,
  'invite-members': InviteMembersForm,
  'connect-amazon': AmazonConnectionForm,
  'activate-merchants': ActivateMerchantsForm,
} as const;

export function OnboardContainer() {
  const {
    currentStep,
    goToPreviousStep,
    goToNextStep,
    isFirstStep,
    isLastStep,
    isLoading,
    stepValidation,
    setStepValidity,
    formData,
    updateStepData,
  } = useOnboarding();
  const { showDialog, hideDialog } = useDialog();
  const router = useRouter();
  const { toast } = useToast();

  const fireConfetti = () => {
    const duration = 3000;
    const interval = 250;
    const end = Date.now() + duration;

    const launch = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.1 },
        colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#EC4899'],
      });

      if (Date.now() < end) {
        setTimeout(launch, interval);
      }
    };

    launch();
  };

  const canProceed = useCallback(() => {
    if (stepValidation.canSkip && isStepSkippable(currentStep)) {
      return true;
    }
    return stepValidation.isValid && formData[currentStep];
  }, [currentStep, formData, stepValidation]);

  const handleComplete = useCallback(async () => {
    if (isLastStep && canProceed()) {
      fireConfetti();
      toast({
        title: '🎉 Welcome to MixShift!',
        description:
          "You've successfully completed onboarding. Your journey to better Amazon management starts now.",
        duration: 5000,
      });
      await new Promise(resolve => setTimeout(resolve, 3000));
      router.push('/dashboard');
    } else {
      goToNextStep();
    }
  }, [isLastStep, canProceed, router, goToNextStep, toast]);

  const handleSkip = useCallback(() => {
    if (formData[currentStep]) {
      showDialog({
        title: 'Skip this step?',
        description: 'Any information entered will not be saved.',
        footer: (
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" onClick={hideDialog}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                hideDialog();
                updateStepData(currentStep, null);
                goToNextStep();
              }}
            >
              Skip
            </Button>
          </div>
        ),
        size: 'sm',
      });
    } else {
      goToNextStep();
    }
  }, [
    currentStep,
    formData,
    showDialog,
    hideDialog,
    updateStepData,
    goToNextStep,
  ]);

  const StepComponent = stepComponents[currentStep];
  const getCanSkip = (step: keyof typeof stepComponents) =>
    step === 'invite-members' ? isStepSkippable(step) : false;

  if (isLoading) {
    return <Spinner className="h-8 w-8 text-primary" />;
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar navigation */}
      <aside className="w-[240px] border-r min-h-screen">
        <StepNavigation currentStep={currentStep} />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full">
        <main className="flex-1 px-12 py-8">
          <div className="max-w-4xl mx-auto">
            <StepHeader
              title={STEP_TITLES[currentStep]}
              description={STEP_DESCRIPTIONS[currentStep]}
            />
            <StepComponent
              onValidationChange={isValid =>
                setStepValidity({
                  isValid,
                  canSkip: getCanSkip(currentStep),
                })
              }
            />
          </div>
        </main>

        <StepFooter
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          currentStep={currentStep}
          stepValidation={{
            canSkip: stepValidation.canSkip || false,
            isValid: stepValidation.isValid,
          }}
          canProceed={canProceed}
          onPrevious={goToPreviousStep}
          onNext={handleComplete}
          onSkip={handleSkip}
        />
      </div>
    </div>
  );
}
