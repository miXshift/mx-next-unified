import { Alert, AlertDescription, AlertTitle } from '@ui/alert';
import { AlertCircle } from 'lucide-react';

interface FormErrorsProps {
  errors: Record<string, string[]>;
}

export function FormErrors({ errors }: FormErrorsProps) {
  if (!errors || Object.keys(errors).length === 0) return null;

  console.log(errors);

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Errors in your submission</AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-4 mt-2 space-y-1">
          {Object.entries(errors).map(([field, messages]) =>
            messages.map((message, i) => (
              <li key={`${field}-${i}`} className="text-sm">
                {message}
              </li>
            ))
          )}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
