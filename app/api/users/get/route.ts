import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { appClient } from "@/lib/auth0"
import { getData } from "@/lib/neon/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const { session } = await req.json()
  console.log(session)
  // if (!session || !session.user) {
  //   return NextResponse.redirect(new URL("/api/auth/login", req.url))
  // }

  // const workspace =

  const { user } = session

  const sql = await getData()
  console.log(user)

  const userDB = await sql`
  SELECT * FROM users WHERE auth0_id = ${user.sub} LIMIT 1
`

  return NextResponse.json(userDB)
}
