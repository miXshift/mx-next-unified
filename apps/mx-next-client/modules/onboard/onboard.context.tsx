'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import {
  OnboardingStep,
  ONBOARDING_STEPS,
  isStepSkippable,
  ONBOARDING_ACTIONS,
} from './onboard.types';
import { logger } from '@utils/logger';

interface StepValidation {
  isValid: boolean;
  canSkip?: boolean;
}

interface ImageData {
  file?: never;
  preview: string;
}

interface OnboardingState {
  currentStep: OnboardingStep;
  isLoading: boolean;
  stepValidation: StepValidation;
  formData: Record<OnboardingStep, any>;
}

interface OnboardingContextType {
  currentStep: OnboardingStep;
  isLoading: boolean;
  stepValidation: StepValidation;
  formData: Record<OnboardingStep, any>;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  goToStep: (step: OnboardingStep) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setStepValidity: (validation: StepValidation) => void;
  updateStepData: (step: OnboardingStep, data: any) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

type OnboardingAction =
  | { type: typeof ONBOARDING_ACTIONS.SET_STEP; step: OnboardingStep }
  | { type: typeof ONBOARDING_ACTIONS.SET_LOADING; isLoading: boolean }
  | {
      type: typeof ONBOARDING_ACTIONS.SET_VALIDATION;
      validation: StepValidation;
    }
  | {
      type: typeof ONBOARDING_ACTIONS.UPDATE_STEP_DATA;
      step: OnboardingStep;
      data: any;
    };

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState {
  switch (action.type) {
    case ONBOARDING_ACTIONS.SET_STEP:
      return {
        ...state,
        currentStep: action.step,
        stepValidation: {
          isValid: !!state.formData[action.step],
          canSkip: isStepSkippable(action.step),
        },
      };
    case ONBOARDING_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    case ONBOARDING_ACTIONS.SET_VALIDATION:
      return { ...state, stepValidation: action.validation };
    case ONBOARDING_ACTIONS.UPDATE_STEP_DATA:
      if (
        typeof window !== 'undefined' &&
        (action.data?.avatar || action.data?.logo)
      ) {
        const file = action.data.avatar || action.data.logo;
        const imageData = {
          preview: URL.createObjectURL(file),
        };
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.step]: {
              ...action.data,
              [action.data.avatar ? 'avatar' : 'logo']: imageData,
            },
          },
        };
      }
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.step]: action.data,
        },
      };
    default:
      return state;
  }
}

function loggerMiddleware(reducer: typeof onboardingReducer) {
  return (state: OnboardingState, action: OnboardingAction) => {
    console.group('Onboarding Action:', action.type);
    console.log('Previous State:', state);
    console.log('Action:', action);
    const nextState = reducer(state, action);
    console.log('Next State:', nextState);
    console.groupEnd();
    return nextState;
  };
}

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] =
    useState<OnboardingStep>('collect-lead');
  const [isLoading, setIsLoading] = useState(true);
  const [stepValidation, setStepValidation] = useState<StepValidation>({
    isValid: false,
    canSkip: isStepSkippable('collect-lead'),
  });
  const [formData, setFormData] = useState<Record<OnboardingStep, any>>(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('onboardingData');
      return savedData ? JSON.parse(savedData) : {};
    }
    return {};
  });

  useEffect(() => {
    logger.hook('Loading saved step', 'OnboardingProvider', {
      type: 'effect',
      dependencies: [],
    });

    const savedStep = localStorage.getItem('onboardingStep');
    if (savedStep && ONBOARDING_STEPS.includes(savedStep as OnboardingStep)) {
      setCurrentStep(savedStep as OnboardingStep);
      setStepValidation({
        isValid: !!formData[savedStep as OnboardingStep],
        canSkip: isStepSkippable(savedStep as OnboardingStep),
      });

      logger.hook('Restored step from storage', 'OnboardingProvider', {
        type: 'effect',
        prevValue: currentStep,
        nextValue: savedStep,
      });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboardingData', JSON.stringify(formData));
    }
  }, [formData]);

  const goToStep = useCallback(
    (step: OnboardingStep) => {
      logger.hook('Navigation initiated', 'OnboardingProvider', {
        type: 'callback',
        prevValue: currentStep,
        nextValue: step,
      });

      setCurrentStep(step);
      localStorage.setItem('onboardingStep', step);

      // Check if step has data and validate it
      const stepData = formData[step];
      setStepValidation({
        isValid: !!stepData,
        canSkip: isStepSkippable(step),
      });
    },
    [currentStep, formData]
  );

  const goToNextStep = useCallback(() => {
    if (stepValidation.isValid || stepValidation.canSkip) {
      const currentIndex = ONBOARDING_STEPS.indexOf(currentStep);
      if (currentIndex < ONBOARDING_STEPS.length - 1) {
        const nextStep = ONBOARDING_STEPS[currentIndex + 1];
        goToStep(nextStep);
      }
    }
  }, [currentStep, stepValidation, goToStep]);

  const goToPreviousStep = useCallback(() => {
    const currentIndex = ONBOARDING_STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      const previousStep = ONBOARDING_STEPS[currentIndex - 1];
      goToStep(previousStep);
    }
  }, [currentStep, goToStep]);

  const updateStepData = useCallback((step: OnboardingStep, data: any) => {
    // If data contains a File object for image/logo, convert it
    if (data?.avatar instanceof File || data?.logo instanceof File) {
      const file = data.avatar || data.logo;
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData: ImageData = {
          file,
          preview: reader.result as string,
        };
        setFormData(prev => ({
          ...prev,
          [step]: {
            ...data,
            [data.avatar ? 'avatar' : 'logo']: imageData,
          },
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [step]: data,
      }));
    }
  }, []);

  const value = {
    currentStep,
    isLoading,
    stepValidation,
    formData,
    isFirstStep: currentStep === ONBOARDING_STEPS[0],
    isLastStep: currentStep === ONBOARDING_STEPS[ONBOARDING_STEPS.length - 1],
    progress:
      ((ONBOARDING_STEPS.indexOf(currentStep) + 1) / ONBOARDING_STEPS.length) *
      100,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    setStepValidity: setStepValidation,
    updateStepData,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
