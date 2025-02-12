"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { motion } from "framer-motion";
import { IconBrain, IconMail, IconLock, IconBrandGoogle, IconBrandGithub } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      await signIn.create({
        identifier: email,
        password,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "oauth_google" | "oauth_github") => {
    if (!isLoaded) return;
    try {
      setIsLoading(true);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/chat",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Sign In Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 w-full max-w-md space-y-8"
      >
        <div className="rounded-2xl border bg-background/60 backdrop-blur-xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Sign in to continue to Orbe</p>
            </div>

            {/* OAuth Buttons */}
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="relative group hover:border-primary/50"
                onClick={() => handleOAuthSignIn("oauth_google")}
                disabled={isLoading}
              >
                <IconBrandGoogle className="h-5 w-5 mr-2 text-primary" />
                Continue with Google
                <motion.div
                  className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              </Button>

              <Button
                variant="outline"
                className="relative group hover:border-primary/50"
                onClick={() => handleOAuthSignIn("oauth_github")}
                disabled={isLoading}
              >
                <IconBrandGithub className="h-5 w-5 mr-2 text-primary" />
                Continue with GitHub
                <motion.div
                  className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Label 
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-200 ${
                      email ? '-top-2 text-xs bg-background px-1' : 'top-3'
                    }`}
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/50"
                    required
                  />
                  <IconMail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Label 
                    htmlFor="password"
                    className={`absolute left-4 transition-all duration-200 ${
                      password ? '-top-2 text-xs bg-background px-1' : 'top-3'
                    }`}
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-background/50"
                    required
                  />
                  <IconLock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary via-blue-600 to-violet-600 hover:shadow-lg hover:shadow-primary/25"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>

            <div className="space-y-4 text-center text-sm">
              <Link 
                href="/forgot-password"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Forgot your password?
              </Link>

              <div className="text-muted-foreground">
                Don't have an account?{" "}
                <Link 
                  href="/sign-up"
                  className="text-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>

              <div className="text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}