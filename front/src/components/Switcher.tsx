"use client";

import { Switch } from "@nextui-org/react";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Switcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDarkMode(theme === "dark");
  }, [theme]);

  if (!mounted) return null;

  return (
    <Switch
      isSelected={isDarkMode}
      size="lg"
      color="warning"
      onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
    />
  );
};

export default Switcher;
