'use client';

import { useEffect, useState, useCallback } from 'react';
import { OnboardingStep, ONBOARDING_STEPS } from './onboard.types';
import { logger } from '@utils/logger';

export function useOnboardStep() {
  const [currentStep, setCurrentStep] =
    useState<OnboardingStep>('collect-lead');
  const [isLoading, setIsLoading] = useState(true);

  // Log initial render
  logger.hook('Hook rendered', 'useOnboardStep', { type: 'render' });

  useEffect(() => {
    logger.hook('Loading saved step', 'useOnboardStep', {
      type: 'effect',
      dependencies: [],
    });

    const savedStep = localStorage.getItem('onboardingStep');
    if (savedStep && ONBOARDING_STEPS.includes(savedStep as OnboardingStep)) {
      setCurrentStep(savedStep as OnboardingStep);
      logger.hook('Restored step from storage', 'useOnboardStep', {
        type: 'effect',
        prevValue: currentStep,
        nextValue: savedStep,
      });
    }
    setIsLoading(false);
  }, []);

  const goToStep = useCallback(
    (step: OnboardingStep) => {
      logger.hook('Navigating to step', 'useOnboardStep', {
        type: 'callback',
        prevValue: currentStep,
        nextValue: step,
      });

      setCurrentStep(step);
      localStorage.setItem('onboardingStep', step);
      logger.action('Updated onboarding step', step);
    },
    [currentStep]
  );

  const goToNextStep = useCallback(() => {
    const currentIndex = ONBOARDING_STEPS.indexOf(currentStep);
    if (currentIndex < ONBOARDING_STEPS.length - 1) {
      const nextStep = ONBOARDING_STEPS[currentIndex + 1];
      logger.hook('Moving to next step', 'useOnboardStep', {
        type: 'callback',
        prevValue: currentStep,
        nextValue: nextStep,
      });
      goToStep(nextStep);
    }
  }, [currentStep, goToStep]);

  const goToPreviousStep = useCallback(() => {
    const currentIndex = ONBOARDING_STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      const previousStep = ONBOARDING_STEPS[currentIndex - 1];
      logger.hook('Moving to previous step', 'useOnboardStep', {
        type: 'callback',
        prevValue: currentStep,
        nextValue: previousStep,
      });
      goToStep(previousStep);
    }
  }, [currentStep, goToStep]);

  // Log whenever currentStep changes
  useEffect(() => {
    logger.hook('Step changed', 'useOnboardStep', {
      type: 'effect',
      dependencies: ['currentStep'],
      prevValue: undefined,
      nextValue: currentStep,
    });
  }, [currentStep]);

  return {
    currentStep,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    isLoading,
    isFirstStep: currentStep === ONBOARDING_STEPS[0],
    isLastStep: currentStep === ONBOARDING_STEPS[ONBOARDING_STEPS.length - 1],
    progress:
      ((ONBOARDING_STEPS.indexOf(currentStep) + 1) / ONBOARDING_STEPS.length) *
      100,
  };
}
