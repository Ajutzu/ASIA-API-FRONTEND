"use client"

import { useEffect, useState } from "react"
import { BarChart3, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { RepositoryDialog } from "@/components/home/RepositoryDialog"

export default function Navbar() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b-2 border-dashed border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-7xl px-6 border-x-2 border-dashed py-2 flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                    <BarChart3 className="h-6 w-6" />
                    <span className="hidden md:inline-block">ASIA API PROJECT</span>
                    <span className="md:hidden">ASIA API</span>
                </div>

                <div className="flex items-center gap-4">
                    <RepositoryDialog />
                    
                    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
