'use client';

import { ASSETS } from '../constants/assets';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Icon() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src={resolvedTheme === 'dark' ? ASSETS.icons.darkLogo : ASSETS.icons.logo}
        alt="Icon"
        width={100}
        height={100}
      />
    );
  }

  return (
    <Image
      src={resolvedTheme === 'dark' ? ASSETS.icons.darkLogo : ASSETS.icons.logo}
      alt="Icon"
      width={100}
      height={100}
    />
  );
}
