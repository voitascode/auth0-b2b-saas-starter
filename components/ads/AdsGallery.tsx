'use client'

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import MediaTypeFilter, { MediaType } from "./MediaTypeFilter"
import ExportDropdown from "./ExportDropdown"

export default function AdsGallery({ results }: { results: any[] }) {
  const [selectedAd, setSelectedAd] = useState<any | null>(null)
  const [mediaFilter, setMediaFilter] = useState<MediaType>('all')


  const filteredResults = useMemo(() => {
    return results.filter((item) => {
      const snapshot = item.snapshot || {}
      const hasVideo =
        snapshot?.cards?.[0]?.videoSdUrl ||
        snapshot?.videoSdUrl ||
        snapshot?.videos?.length > 0
      const hasImage =
        snapshot?.cards?.[0]?.resizedImageUrl ||
        snapshot?.images?.length > 0
  
      if (mediaFilter === 'video') return hasVideo
      if (mediaFilter === 'image') return hasImage && !hasVideo
      return true
    })
  }, [results, mediaFilter])
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
  }

  const extractText = (snapshot: any) => {
    const text = snapshot?.body?.text
    const cards = snapshot?.cards || []
    const fallback = cards[0]?.body

    if (!text || text.includes("{{")) {
      return fallback || '—'
    }
    return text
  }

  const extractMedia = (snapshot: any) => {
    const card = snapshot?.cards?.[0]
    const video =
      card?.videoSdUrl ||
      card?.videoHdUrl ||
      snapshot?.videoSdUrl ||
      snapshot?.videoHdUrl ||
      snapshot?.videos?.[0]?.videoSdUrl ||
      snapshot?.videos?.[0]?.videoHdUrl

    const image =
      card?.resizedImageUrl ||
      card?.originalImageUrl ||
      snapshot?.images?.[0]?.resizedImageUrl ||
      snapshot?.images?.[0]?.originalImageUrl

    return { video, image }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <MediaTypeFilter selected={mediaFilter} onChange={setMediaFilter} />
        <ExportDropdown data={filteredResults} />
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredResults.map((item, i) => {
          const snapshot = item.snapshot || {}
          const pageName = snapshot?.pageName || item.pageName || '—'
          const profilePicture = snapshot?.pageProfilePictureUrl
          const description = extractText(snapshot)
          const { video, image } = extractMedia(snapshot)
  
          return (
            <Card key={i} className="flex flex-col justify-between overflow-hidden">
              <CardContent className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <Image
                    src={profilePicture || '/logo-placeholder.svg'}
                    alt="Profil"
                    width={32}
                    height={32}
                    className="rounded-full border"
                  />
                  <div>
                    <p className="font-medium text-sm">{pageName}</p>
                    <p className="text-xs text-muted-foreground">Sponzorováno</p>
                  </div>
                </div>
  
                {/* Badge + datum */}
                <div>
                  <Badge variant="outline">{item.adArchiveID || item.adArchiveId}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Běží od: {formatDate(item.startDateFormatted)}
                  </p>
                </div>
  
                {/* Popis */}
                <p className="text-sm line-clamp-3">{description}</p>
  
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="px-0 text-sm">
                      Číst více
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <p className="text-base">{description}</p>
                  </DialogContent>
                </Dialog>
  
                {/* Médium */}
                <div className="w-full rounded-md overflow-hidden border">
                  {video ? (
                    <video
                      controls
                      className="w-full h-auto object-cover"
                      poster={image}
                    >
                      <source src={video} type="video/mp4" />
                      Váš prohlížeč nepodporuje video tag.
                    </video>
                  ) : image ? (
                    <Image
                      src={image}
                      alt="Náhled reklamy"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground p-4 text-center">Žádné médium</div>
                  )}
                </div>
  
                {/* Modal button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-2">Zobrazit více</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <h4 className="font-medium mb-2">{pageName}</h4>
                    <p>{description}</p>
                    {video && (
                      <video controls className="mt-4 rounded-md border">
                        <source src={video} type="video/mp4" />
                      </video>
                    )}
                    {!video && image && (
                      <Image
                        src={image}
                        alt="Detail"
                        width={800}
                        height={500}
                        className="mt-4 rounded-md border"
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
