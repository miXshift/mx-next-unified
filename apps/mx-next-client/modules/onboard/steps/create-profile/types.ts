export interface ProfileFormData {
  firstName: string;
  lastName: string;
  displayName: string;
  jobTitle: string;
  timezone: string;
  avatar?: File;
  agreedToTerms: boolean;
}

export interface FormFieldConfig {
  id: keyof ProfileFormData;
  label: string;
  type?: 'input' | 'avatar';
  placeholder?: string;
  required?: boolean;
}
