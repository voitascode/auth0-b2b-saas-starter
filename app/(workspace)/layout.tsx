import React from "react"
import { redirect } from "next/navigation"
import WorkspacePage from "@/features/workspace/WorkspacePage"

import { appClient } from "@/lib/auth0"

async function layout({ children }: { children: React.ReactNode }) {
  const session = await appClient.getSession()

  console.log(session, "sess")

  if (!session) {
    redirect("/api/auth/login")
  }
  return <WorkspacePage session={session}>{children}</WorkspacePage>
}

export default layout
