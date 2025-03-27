import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { getData } from "@/lib/neon/server"
import { createClient } from "@/lib/supabase/server"

const APIFY_TOKEN = process.env.APIFY_TOKEN_ORGANIZATION!

export async function POST(req: NextRequest) {
  const { name, workspaceId } = await req.json()
  // const cookieStore = await cookies()
  // const supabase = await createClient()

  const sql = await getData()

  await sql`CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT,
    workspace_id TEXT NOT NULL,
    name TEXT NOT NULL,
    ads_accounts TEXT[],
    notification TEXT[]
    )`

  const res =
    await sql`INSERT INTO brands (workspace_id, name) VALUES (${workspaceId}, ${name})`

  // const lala = await supabase.auth.getUser()
  // const { data, error } = await supabase.from("users").select("*")
  // const {
  //   data: { user },
  //   error: userError,
  // } = await supabase.auth.getUser()

  // console.log(data, "la")

  // if (!user || userError) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  // const workspaceId = user.user_metadata?.workspace_id
  // if (!workspaceId) {
  //   return NextResponse.json({ error: "Missing workspace ID" }, { status: 400 })
  // }

  // Apify: scrape Facebook Page
  // const scrapingRes = await fetch(
  //   `https://api.apify.com/v2/acts/apify~facebook-ads-scraper/run-sync-get-dataset-items`,
  //   {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${APIFY_TOKEN}`,
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       startUrls: [{ url }],
  //       resultsLimit: 99999,
  //       activeStatus: "active",
  //     }),
  //   }
  // )

  // const scraped = await scrapingRes.json()

  // if (!Array.isArray(scraped) || scraped.length === 0) {
  //   return NextResponse.json(
  //     { error: "Scraper vrátil prázdná data" },
  //     { status: 400 }
  //   )
  // }
  // console.log(scraped)
  // const firstItem = scraped[0]
  // const pageName = firstItem?.pageName || "Nový Brand"
  // const accountIdentifier = firstItem?.pageID || url

  // Založit brand
  // const { data: brand, error: brandErr } = await supabase
  //   .from("brands")
  //   .insert({
  //     workspace_id: workspaceId,
  //     name: pageName,
  //   })
  //   .select()
  //   .single()

  // if (brandErr) {
  //   return NextResponse.json({ error: brandErr.message }, { status: 500 })
  // }

  // // Založit první ads_account
  // const { error: accountErr } = await supabase.from("ads_accounts").insert({
  //   brand_id: brand.id,
  //   platform: "facebook",
  //   account_identifier: accountIdentifier,
  //   url,
  //   name: pageName,
  // })

  // if (accountErr) {
  //   return NextResponse.json({ error: accountErr.message }, { status: 500 })
  // }

  return NextResponse.json(res)
}
