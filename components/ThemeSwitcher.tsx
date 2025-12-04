// components/ThemeSwitcher.tsx
"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { SunIcon, MoonIcon } from "./Icons"; // Ikonky si vytvoříme níže

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      color="success"
      isSelected={theme === "dark"}
      size="lg"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
      onValueChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
    />
  );
};
