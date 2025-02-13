"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const handle = async () => {
      try {
        await handleRedirectCallback({
          afterSignInUrl: "/chat",
          afterSignUpUrl: "/chat",
        });
      } catch (error) {
        console.error("Error handling redirect:", error);
        router.push("/sign-in");
      }
    };
    
    handle();
  }, [handleRedirectCallback, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Completing sign in...</h2>
        <p className="text-muted-foreground">Please wait while we redirect you.</p>
      </div>
    </div>
  );
}