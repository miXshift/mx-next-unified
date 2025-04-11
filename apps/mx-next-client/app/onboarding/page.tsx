import { OnboardContainer } from '@/modules/onboard/onboard.component';
import { OnboardingProvider } from '@/modules/onboard/onboard.context';

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardContainer />
    </OnboardingProvider>
  );
}
