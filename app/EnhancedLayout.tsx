"use client";

import { lazy, Suspense } from "react";
import Provider from "./providers";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Toaster = lazy(() =>
  import("sonner").then((mod) => ({
    default: mod.Toaster,
  }))
);

export function EnhancedLayout({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const preloadResources = async () => {
      if (typeof window !== "undefined") {
        const fontLink = document.createElement("link");
        fontLink.href =
          "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);
      }
    };
    preloadResources();
  }, []);

  if (!mounted) return null;

  return (
    <Provider>
      {children}
      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </div>
      <Suspense>
        <Toaster position="top-center" richColors closeButton />
      </Suspense>
    </Provider>
  );
}
