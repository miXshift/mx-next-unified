// components/Logo.tsx
'use client'
import { ASSETS } from '@/lib/constants/assets'
import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Logo() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Image
        src={ASSETS.logos.light}
        alt="Logo"
        width={120}
        height={40}
      />
    )
  }

  return (
    <Image
      src={resolvedTheme === 'dark' ? ASSETS.logos.dark : ASSETS.logos.light}
      alt="Logo"
      width={120}
      height={40}
    />
  )
}