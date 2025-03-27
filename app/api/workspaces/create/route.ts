import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { appClient } from "@/lib/auth0"
import { getData } from "@/lib/neon/server"

export const POST = async (req: NextRequest) => {
  const { workspace } = await req.json()
  const session = await appClient.getSession()

  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/api/auth/login", req.url))
  }

  const { user } = session

  const sql = await getData()

  await sql`CREATE TABLE IF NOT EXISTS workspaces (
    id UUID PRIMARY KEY DEFAULT, gen_random_uuid(),
    name TEXT NOT NULL,
    users TEXT[],
    brands TEXT[],
    auth0_id TEXT NOT NULL
  )`

  console.log(workspace)
  const workspaceData = {
    name: workspace.display_name,
    users: [],
    brands: [],
    auth0_id: workspace.id,
  }

  const userWorkspace = await sql`
  INSERT INTO workspaces (name, users, brands, auth0_id)
  VALUES (${workspaceData.name}, ${workspaceData.users}, ${workspaceData.brands}, ${workspaceData.auth0_id})
  RETURNING id
`

  console.log(userWorkspace, "create")

  return NextResponse.json(userWorkspace)
}
