/* File: app/theme-provider.jsx */

'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri'

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      // --- FIX APPLIED HERE ---
      // Added: relative, inline-flex, items-center, justify-center
      // This ensures the two icons stack and animate correctly.
      className="relative inline-flex items-center justify-center p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      // --- END OF FIX ---
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
    >
      <RiSunFill className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <RiMoonClearFill className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}