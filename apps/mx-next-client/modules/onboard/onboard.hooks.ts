'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { OnboardingStep, ONBOARDING_STEPS } from './onboard.types';
import { logger } from '@utils/logger';

interface StepValidation {
  isValid: boolean;
  canSkip?: boolean;
}

export function useOnboardStep() {
  const [currentStep, setCurrentStep] =
    useState<OnboardingStep>('collect-lead');
  const [isLoading, setIsLoading] = useState(true);
  const [stepValidation, setStepValidation] = useState<StepValidation>({
    isValid: false,
  });
  const validationRef = useRef(stepValidation);

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

  // Update ref when state changes
  useEffect(() => {
    validationRef.current = stepValidation;
  }, [stepValidation]);

  const goToStep = useCallback((step: OnboardingStep) => {
    const currentValidation = validationRef.current;

    console.log('Attempting navigation:', {
      from: currentStep,
      to: step,
      validation: currentValidation,
    });

    // Direct state updates without Promise.resolve()
    setCurrentStep(step);
    localStorage.setItem('onboardingStep', step);
    setStepValidation({ isValid: false });

    logger.hook('Navigation complete', 'useOnboardStep', {
      type: 'callback',
      prevValue: currentStep,
      nextValue: step,
    });
  }, []);

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
  }, [goToStep]);

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

  // Force re-render when currentStep changes
  useEffect(() => {
    console.log('Step actually changed to:', currentStep);
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
    setStepValidity: (validation: StepValidation) => {
      console.log('Setting validation:', validation);
      setStepValidation(validation);
    },
  };
}
