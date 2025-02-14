"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";
import { IconBrain } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Send, Paperclip, Mic, AtSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";

const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

// Footer component with mobile detection
const Footer = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed bottom-8 left-0 right-0 flex justify-center px-4"
    >
      <motion.div
        initial={false}
        style={{
          width: isExpanded ? "min(600px, 92vw)" : "200px",
          transformOrigin: "center",
        }}
        onClick={() => isMobile && setIsExpanded(!isExpanded)}
        onHoverStart={() => !isMobile && setIsExpanded(true)}
        onHoverEnd={() => !isMobile && setIsExpanded(false)}
        className={cn(
          "flex items-center gap-4 rounded-full border bg-background/95 px-6 py-3",
          "shadow-lg backdrop-blur",
          "transition-all duration-500 ease-in-out",
          "hover:border-primary/50 hover:shadow-primary/25 hover:shadow-xl",
          isMobile ? "cursor-pointer active:scale-95" : ""
        )}
      >
        {/* Logo Section - Always Visible */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <IconBrain className="h-5 w-5 text-primary" />
          <span className="font-outfit font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
            Orbe
          </span>
          {isMobile && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-2"
            >
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          )}
        </div>

        {/* Expandable Content */}
        <div
          className={cn(
            "flex items-center gap-6 overflow-hidden",
            "transition-all duration-500 ease-in-out",
            isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
          )}
        >
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap hover:underline"
            >
              Privacy
            </Link>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              © {new Date().getFullYear()} Orbe AI
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Then update the ChatInput component
const ChatInput = () => {
  const [isTyping, setIsTyping] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center gap-2">
        <textarea
          ref={inputRef}
          rows={1}
          readOnly
          className={cn(
            "w-full pr-16 pl-4 py-3 min-h-[52px] bg-background/95 border rounded-full",
            "text-lg text-foreground resize-none",
            "focus:outline-none focus:ring-0",
            "selection:bg-transparent",
            "cursor-default",
            "transition-all duration-300 ease-in-out",
            isTyping && "border-primary/50 shadow-lg shadow-primary/20"
          )}
        />

        {/* Send Button - Now inside the input */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center h-10 w-10 rounded-full 
                     bg-gradient-to-r from-primary to-blue-600 
                     text-primary-foreground shadow-lg"
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Sign In Button Component
const SignInButton = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1280px)"); // xl breakpoint
  const isMobile = useMediaQuery("(max-width: 640px)"); // sm breakpoint

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative",
        isMobile ? "w-full" : "w-auto"
      )}
    >
      <Link href="/sign-in">
        <Button
          size={isLargeScreen ? "default" : "lg"}
          className={cn(
            "rounded-full shadow-lg",
            "bg-gradient-to-r from-primary via-blue-600 to-violet-600",
            "hover:shadow-xl hover:shadow-primary/25",
            "transition-all duration-300 relative group",
            isMobile ? "w-full h-14" : "w-auto h-12",
            isLargeScreen ? "min-w-[180px] text-sm" : "min-w-[200px] text-base",
            !isMobile && "px-6"
          )}
        >
          <span className="flex items-center justify-center gap-2">
            Sign in
            <motion.div 
              className={cn(
                "flex items-center gap-2",
                "opacity-0 group-hover:opacity-100",
                "-translate-x-4 group-hover:translate-x-0",
                "transition-all duration-300",
                isLargeScreen ? "ml-1" : "ml-2"
              )}
            >
              <IconBrain 
                className={cn(
                  "hidden xs:block",
                  isLargeScreen ? "h-3.5 w-3.5" : "h-4 w-4"
                )} 
              />
              <ArrowRight 
                className={isLargeScreen ? "h-3.5 w-3.5" : "h-4 w-4"} 
              />
            </motion.div>
          </span>
        </Button>
      </Link>
    </motion.div>
  );
};

// Prompts for the chat input
const prompts = [
  "Design a landing page...",
  "Write a blog post...",
  "Debug my code...",
  "Write a story...",
  "Inspire me...",
];

export default function Home() {
  const [isTyping, setIsTyping] = React.useState(false);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex max-w-7xl w-full flex-col xl:flex-row items-center gap-8 xl:gap-16 py-8 xl:py-16"
      >
        {/* Left Content */}
        <motion.div
          className="flex-1 space-y-8 xl:space-y-10 w-full xl:w-1/2 text-center xl:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block relative"
          >
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-outfit font-bold bg-gradient-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Orbe
            </h2>
            <motion.div
              className="absolute -z-10 -inset-2 bg-gradient-to-r from-primary/20 via-blue-600/20 to-violet-600/20 blur-xl opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            />
          </motion.div>

          <h1 className="font-outfit text-3xl sm:text-4xl xl:text-6xl 2xl:text-7xl font-bold leading-tight tracking-tight">
            Your AI companion for{" "}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">
              limitless possibilities
            </span>
          </h1>

          <p className="text-base sm:text-lg xl:text-xl text-muted-foreground max-w-xl mx-auto xl:mx-0">
            Empowering conversations with advanced AI technology.
          </p>

          <SignInButton />
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex-1 w-full xl:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative mx-auto max-w-[480px]">
            <motion.div
              animate={{
                boxShadow: [
                  "0px 0px 0px rgba(0,0,0,0)",
                  "0px 20px 40px rgba(0,0,0,0.1)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="rounded-2xl border bg-background/95 p-8 backdrop-blur"
            >
              <div className="space-y-6">
                <div className="relative">
                  <ChatInput />
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="pl-4 pt-3.5 text-primary/80">
                      <Typewriter
                        options={{
                          strings: prompts,
                          autoStart: true,
                          loop: true,
                          delay: 80,
                          deleteSpeed: 60,
                          cursor: "",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Floating Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-r from-primary/30 to-blue-600/30 blur-xl"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 7, repeat: Infinity }}
              className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-gradient-to-r from-blue-600/30 to-violet-600/30 blur-xl"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Footer */}
      <Footer />
      <motion.div />
    </div>
  );
}
