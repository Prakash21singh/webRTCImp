// components/theme-provider-wrapper.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Only show the UI once mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // You can show a simple placeholder or nothing at all
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
