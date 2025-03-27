import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { Session } from "@auth0/nextjs-auth0"

import { appClient } from "@/lib/auth0"
import { getData } from "@/lib/neon/server"
import { createClient } from "@/lib/supabase/server"

const APIFY_TOKEN = process.env.APIFY_API_TOKEN!

export const GET = async (req: NextRequest) => {
  const session = await appClient.getSession()
  console.log(session)
  // if (!session || !session.user) {
  //   return NextResponse.redirect(new URL("/api/auth/login", req.url))
  // }

  // const workspace =

  const { user } = session as Session

  const sql = await getData()
  console.log(user)

  const res = await fetch(`${req.nextUrl.origin}/api/workspaces/get`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workspaceAuthId: user.org_id }),
    credentials: "include",
  })
  const workspace = res.json()
  console.log(workspace)
  await sql`CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    workspace_id TEXT NOT NULL,
    email TEXT NOT NULL,
    auth0_id TEXT NOT NULL
  )`

  const userDB = await sql`INSERT INTO users (name,
    workspace_id,
    email,
    auth0_id) VALUES (${user.nickname}, ${user.org_id}, ${user.email}, ${user.sub})`

  // console.log(brands, error)

  return NextResponse.json(userDB)
}
