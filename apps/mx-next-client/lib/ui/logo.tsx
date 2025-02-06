// components/Logo.tsx
'use client';
import { ASSETS } from '@constants/assets';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSidebar } from './sidebar';

export default function Logo() {
  const { open } = useSidebar();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src={ASSETS.logos.light}
        alt="Logo"
        width={open ? 180 : 50}
        height={open ? 40 : 50}
      />
    );
  }

  return (
    <Image
      src={
        open
          ? resolvedTheme === 'dark'
            ? ASSETS.logos.dark
            : ASSETS.logos.light
          : resolvedTheme === 'dark'
            ? ASSETS.icon.light
            : ASSETS.icon.dark
      }
      alt="Logo"
      width={open ? 180 : 50}
      height={open ? 40 : 50}
    />
  );
}
