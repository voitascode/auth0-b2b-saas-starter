import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { appClient } from "@/lib/auth0"
import { getData } from "@/lib/neon/server"

export const POST = async (req: NextRequest) => {
  const { workspaceAuthId } = await req.json()

  const sql = await getData()

  const userWorkspace = await sql`
  SELECT * FROM workspaces WHERE auth0_id = ${workspaceAuthId} LIMIT 1
`

  console.log(userWorkspace, "create")

  return NextResponse.json(userWorkspace)
}
