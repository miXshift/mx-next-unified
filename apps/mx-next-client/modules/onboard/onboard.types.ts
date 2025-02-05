export type OnboardingStep =
  | 'collect-lead'
  | 'create-profile'
  | 'create-organization'
  | 'invite-members'
  | 'connect-amazon'
  | 'activate-merchants';

export const ONBOARDING_STEPS: OnboardingStep[] = [
  'collect-lead',
  'create-profile',
  'create-organization',
  'invite-members',
  'connect-amazon',
  'activate-merchants',
];

export const STEP_TITLES: Record<OnboardingStep, string> = {
  'collect-lead': 'Welcome',
  'create-profile': 'Create Profile',
  'create-organization': 'Organization Details',
  'invite-members': 'Invite Team Members',
  'connect-amazon': 'Connect Amazon',
  'activate-merchants': 'Activate Merchants',
};

export const STEP_DESCRIPTIONS: Record<OnboardingStep, string> = {
  'collect-lead': "Let's get started with your account setup",
  'create-profile': 'Tell us more about yourself',
  'create-organization': 'Set up your organization',
  'invite-members': 'Invite your team members',
  'connect-amazon': 'Connect your Amazon account',
  'activate-merchants': 'Set up your merchant accounts',
};
