"use client";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme={theme}>
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
