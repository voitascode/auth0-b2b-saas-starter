'use client'

import Link from "next/link"
import { useState } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import Image from "next/image"
import AdsGallery from '@/components/ads/AdsGallery'

function extractTitle(snapshot: any): string {
  const rawTitle = snapshot?.title
  const cards = snapshot?.cards || []
  const firstCard = cards[0] || {}

  const titleCandidates = [
    rawTitle,
    firstCard?.title,
    firstCard?.body,
    snapshot?.caption,
  ]

  for (const t of titleCandidates) {
    if (typeof t === 'string' && !t.includes('{{') && t.trim().length > 0) {
      return t
    }
  }

  return '—'
}

export default function DashboardHome() {
  const [url, setUrl] = useState('')
  const [limit, setLimit] = useState(20)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResults([])

    toast('Spouštím scraping… Může to trvat až 2 minuty')

    try {
      const res = await fetch('/api/apify_fb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, resultsLimit: limit })
      })

      const data = await res.json()

      if (!res.ok || !Array.isArray(data)) {
        toast.error('Scraping selhal nebo vrátil prázdná data')
        setResults([])
        setLoading(false)
        return
      }

      setResults(data)
      toast.success(`Načteno ${data.length} reklam`)
    } catch (err) {
      toast.error('Chyba při načítání dat ze scraperu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 flex-grow flex-col gap-4 lg:gap-6">
      {/* Nový hlavní obsah */}
      <div className="rounded-3xl border p-6 shadow-sm bg-background max-w-5xl mx-auto space-y-4">
        <h3 className="text-xl font-semibold">Scrape Facebook Ads</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="https://www.facebook.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Limit"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Načítání…' : 'Spustit scraper'}
          </Button>
        </form>

        {results.length > 0 && (
          <div className="pt-8">
            <AdsGallery results={results} />
          </div>
        )}

        {!loading && results && results.length === 0 && (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Žádná data nebyla nalezena nebo chyba ve formátu odpovědi.
          </p>
        )}
      </div>
    </div>
  )
}