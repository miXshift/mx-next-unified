export interface LeadFormData {
  source: string;
  sourceOther?: string;
  companySize: string;
  role: string;
  requirements: string;
  industry: string;
}

export type FieldType = 'select' | 'radio' | 'input' | 'textarea';

export interface FormFieldConfig {
  id: keyof LeadFormData;
  label: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: Array<{
    value: string;
    label: string;
  }>;
}
