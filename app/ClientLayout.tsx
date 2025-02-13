"use client";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { EnhancedLayout } from "./EnhancedLayout";
import { optimisticFetcher } from "../app/utils/optimisticFetch";

const criticalCSS = `
  :root {
    --bg-primary: #ffffff;
    --bg-secondary: #f4f4f5;
    --text-primary: #18181b;
    --text-secondary: #71717a;
    --border-color: #e4e4e7;
    --hover-bg: #f4f4f5;
  }

  [data-theme='dark'], .dark {
    --bg-primary: #18181b;
    --bg-secondary: #27272a;
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --border-color: #3f3f46;
    --hover-bg: #3f3f46;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  .theme-toggle-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 50;
  }
`;

const enhancedFetch = async (url: string, options?: RequestInit) => {
  return optimisticFetcher.fetch(url, {
    ...options,
    priority: "high",
    timeout: 3000,
    retryCount: 2,
  });
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
          <link rel="preconnect" href="/api" />
          <link rel="dns-prefetch" href="/api" />
        </head>
        <body>
          {children}
          <EnhancedLayout />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try{
                if(localStorage.theme==='dark')document.documentElement.classList.add('dark');
                window.__OPTIMISTIC_FETCH__ = ${JSON.stringify({
                  maxConcurrent: 4,
                })};
              }catch{}
            `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
