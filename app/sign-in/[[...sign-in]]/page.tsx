"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { IconBrain } from "@tabler/icons-react";
import { type Appearance } from '@clerk/types';

export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: '#0ea5e9', // This should match your primary color
    colorTextOnPrimaryBackground: '#ffffff',
    colorBackground: '#000000',
    colorInputBackground: '#18181b',
    colorInputText: '#ffffff',
    colorTextSecondary: '#71717a',
  },
  elements: {
    card: "bg-background/80 backdrop-blur border-border shadow-2xl",
    headerTitle: "text-foreground font-outfit",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton: "bg-background/50 hover:bg-background/80 transition-colors duration-200",
    socialButtonsBlockButtonText: "text-foreground font-medium",
    socialButtonsProviderIcon: "text-foreground",
    dividerLine: "bg-border",
    dividerText: "text-muted-foreground",
    formFieldLabel: "text-foreground",
    formFieldInput: "bg-background/50 border-border text-foreground",
    formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-200",
    footerActionText: "text-muted-foreground",
    footerActionLink: "text-primary hover:text-primary/90",
    identityPreviewText: "text-foreground",
    identityPreviewEditButtonIcon: "text-primary",
  },
};
export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        <motion.div 
          className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/30 blur-[128px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/30 blur-[128px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8 flex items-center gap-2"
      >
        <IconBrain className="h-8 w-8 text-primary" />
        <span className="font-outfit text-2xl font-bold bg-gradient-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">
          Orbe
        </span>
      </motion.div>

      {/* Sign In Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10"
      >
        <SignIn appearance={clerkAppearance} />
      </motion.div>
    </div>
  );
}