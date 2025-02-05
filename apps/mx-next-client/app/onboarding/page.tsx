'use client';

import { logger } from '@utils/logger';
import { OnboardContainer } from '@/modules/onboard/onboard.component';
import { useOnboardStep } from '@/modules/onboard/onboard.hooks';

export default function OnboardingPage() {
  logger.page('Onboarding page loaded', 'OnboardingPage');
  const { currentStep } = useOnboardStep();

  const renderStep = () => {
    switch (currentStep) {
      case 'collect-lead':
        return <div>Lead Collection Form</div>;
      case 'create-profile':
        return <div>Create Profile</div>;
      case 'create-organization':
        return <div>Organization Form</div>;
      case 'invite-members':
        return <div>Team Invites</div>;
      case 'connect-amazon':
        return <div>Amazon Connection</div>;
      case 'activate-merchants':
        return <div>Merchant Activation</div>;
      default:
        return null;
    }
  };

  return <OnboardContainer>{renderStep()}</OnboardContainer>;
}
