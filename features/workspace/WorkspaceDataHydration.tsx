"use client"

import { userHydrationAtom } from "@/state/user"
import { workspaceHydrationAtom } from "@/state/workspace"
import { ScopeProvider } from "jotai-scope"
import { HydrationBoundary } from "jotai-ssr"

export default function WorkspaceDataHydration({
  workspace,
  user,
  children,
}: {
  workspace
  user
  children: React.ReactNode
}) {
  return (
    <ScopeProvider atoms={[workspaceHydrationAtom, userHydrationAtom]}>
      <HydrationBoundary
        hydrateAtoms={[
          [workspaceHydrationAtom, workspace],
          [userHydrationAtom, user],
        ]}
      >
        {children}
      </HydrationBoundary>
    </ScopeProvider>
  )
}
