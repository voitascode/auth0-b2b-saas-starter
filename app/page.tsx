import Link from "next/link"

import { appClient } from "@/lib/auth0"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Auth0Logo } from "@/components/auth0-logo"
import { Toaster } from 'sonner'


import { SignUpForm } from "./signup-form"
import { WelcomeBackCard } from "./welcome-back-card"
import { SubmitButton } from "@/components/submit-button"

export default async function Home() {
  const session = await appClient.getSession()

  return (
    <div className="container relative sm:grid h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {session ? (
        <a
          href="/api/auth/logout"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          <SubmitButton>Logout</SubmitButton>
        </a>
      ) : (
        <div
          className="absolute right-4 top-4 md:right-8 md:top-8"
        ><span className="text-sm">Already joined?</span> <a
          className="text-sm underline"
          href="/api/auth/login"
        >
          <SubmitButton>Log in</SubmitButton>
        </a>
        </div>
      )}

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-black" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Auth0Logo className="mr-2 size-8" />
          <span className="font-semibold">Clickscape</span>
        </div>
        <div className="relative z-20 m-auto max-w-sm text-center">
          <blockquote className="space-y-2">
            <div className="space-y-8">
              <p className="text-lg font-medium">
              Unlock Their Ads
              Secrets. Stay Ahead.
              </p>
              <p className="text-lg">
              Get alerts, when competitors launch new ads. Save and browse their ad library, forever.Reveal their ad spend and seasonal trends.
              </p>
            </div>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 flex h-screen">
        {session ? <WelcomeBackCard /> : <SignUpForm />}
      </div>
    </div>
  )
}
