'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar';
import { Button } from '@ui/button';
import { FormControl } from '@ui/form';
import { Camera, X } from 'lucide-react';

interface AvatarInputProps {
  id: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  accept?: string;
  disabled?: boolean;
  className?: string;
  fallback?: string;
  previewUrl?: string;
}

export function AvatarInput({
  id,
  onChange,
  value,
  accept = 'image/jpeg, image/png, image/webp',
  disabled = false,
  className,
  fallback = '',
  previewUrl,
}: AvatarInputProps) {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate initials for fallback
  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    onChange(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <FormControl>
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <Avatar
            className="w-24 h-24 cursor-pointer border-2 border-gray-200"
            onClick={handleClick}
          >
            {preview ? (
              <AvatarImage src={preview} alt="Avatar" />
            ) : (
              <AvatarFallback>{getInitials(fallback)}</AvatarFallback>
            )}
            {!disabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity rounded-full">
                <Camera className="w-8 h-8 text-white" />
              </div>
            )}
          </Avatar>
          {preview && !disabled && (
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
              onClick={handleRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          id={id}
          accept={accept}
          disabled={disabled}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </FormControl>
  );
}
