"use client"

import * as React from "react"
import {ThemeProvider as NextThemesProvider} from "next-themes"
// @ts-expect-error as shadcn suggested
import {type ThemeProviderProps} from "next-themes/dist/types"

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}