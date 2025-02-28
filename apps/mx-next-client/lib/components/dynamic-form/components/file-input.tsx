'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@ui/button';
import { FormControl } from '@ui/form';
import { cn } from '@/lib/utils/styling';

interface FileInputProps {
  id: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  buttonText?: string;
  placeholder?: string;
}

export function FileInput({
  id,
  onChange,
  value,
  accept,
  multiple = false,
  disabled = false,
  className,
  buttonText = 'Choose File',
  placeholder = 'No file chosen',
}: FileInputProps) {
  const [fileName, setFileName] = useState<string>(value?.name || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setFileName('');
      onChange(null);
      return;
    }

    const file = files[0];
    setFileName(file.name);
    onChange(file);
  };

  return (
    <FormControl>
      <div className={cn('flex items-center gap-2', className)}>
        <input
          ref={inputRef}
          type="file"
          id={id}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          disabled={disabled}
        >
          {buttonText}
        </Button>
        <span className="text-sm text-gray-500 truncate">
          {fileName || placeholder}
        </span>
      </div>
    </FormControl>
  );
}
