// /src/app/api/facebook-scraper/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
      const body = await req.json()
      const { url, resultsLimit } = body
  
      const APIFY_TOKEN = process.env.APIFY_TOKEN
  
      const apiUrl = `https://api.apify.com/v2/acts/apify~facebook-ads-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`
  
      const payload = {
        startUrls: [{ url }],
        resultsLimit: resultsLimit || 20,
        activeStatus: 'active'
      }
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
  
      if (!response.ok) {
        const error = await response.json()
        console.error('Apify error response:', error)
        return NextResponse.json({ error }, { status: 500 })
      }
  
      const data = await response.json()
      return NextResponse.json(data)
    } catch (error) {
      console.error('Scraper route error:', error)
      return NextResponse.json({ error: 'Scraper failed to run.' }, { status: 500 })
    }
  }
  