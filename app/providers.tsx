"use client";

import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { useUser } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { eq } from "drizzle-orm";
import { useEffect } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const checkAndCreateUser = async () => {
      if (!isLoaded || !user?.primaryEmailAddress?.emailAddress) return;

      try {
        const email = user.primaryEmailAddress.emailAddress;

        // Check if user exists
        const existingUsers = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (existingUsers.length === 0) {
          const now = new Date();
          await db.insert(users).values({
            email: email,
            name: `${user.firstName} ${user.lastName}`.trim(),
            imageUrl: user.imageUrl ?? null,
            clerkId: user.id,
            storageUsed: 0,
            storageLimit: 5368709120, // 5GB in bytes
            createdAt: now,
            updatedAt: now,
          });
          console.log("New user created:", email);
        }
      } catch (error) {
        console.error("Error managing user:", error);
      }
    };

    checkAndCreateUser();
  }, [user, isLoaded]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
