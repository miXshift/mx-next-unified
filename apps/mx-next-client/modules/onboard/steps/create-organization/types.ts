export interface OrganizationFormData {
  companyName: string;
  companyDisplayName: string;
  companyType: string;
  logo?: File;
  agreedToTerms: boolean;
}

export interface FormFieldConfig {
  id: keyof OrganizationFormData;
  label: string;
  type?: 'input' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: Array<{
    value: string;
    label: string;
  }>;
}
