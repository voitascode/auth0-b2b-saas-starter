import { Session } from "@auth0/nextjs-auth0"

import { appClient } from "@/lib/auth0"

import WorkspaceDataHydration from "./WorkspaceDataHydration"

const BASE_URL = process.env.APP_BASE_URL

export default async function WorkspacePage({
  session,
  children,
}: {
  session: Session
  children: React.ReactNode
}) {
  console.log(session, "res")
  const res = await fetch(`${BASE_URL}/api/users/get`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session }),
    credentials: "include",
  })

  const user = await res.json()
  const workspaceRes = await fetch(`${BASE_URL}/api/workspaces/get`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workspaceAuthId: user.workspace_id }),
    credentials: "include",
  })
  const workspace = await workspaceRes.json()

  console.log(res, workspace)

  // return <div>{children}</div>
  return (
    <WorkspaceDataHydration workspace={workspace} user={user}>
      {children}
    </WorkspaceDataHydration>
  )
}
