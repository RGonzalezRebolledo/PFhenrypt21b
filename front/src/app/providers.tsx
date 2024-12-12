'use client';

import { FC, PropsWithChildren, useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextUIProvider>
      <NextThemesProvider>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default Providers;
