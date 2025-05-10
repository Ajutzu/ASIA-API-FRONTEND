"use client";

import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}