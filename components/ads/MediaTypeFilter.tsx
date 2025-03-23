'use client'

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type MediaType = 'all' | 'image' | 'video'

export default function MediaTypeFilter({
  selected,
  onChange,
}: {
  selected: MediaType
  onChange: (value: MediaType) => void
}) {
  return (
    <ToggleGroup
      type="single"
      value={selected}
      onValueChange={(val) => onChange((val as MediaType) || 'all')}
      className="flex gap-2"
    >
      <ToggleGroupItem value="all">Vše</ToggleGroupItem>
      <ToggleGroupItem value="image">Obrázky</ToggleGroupItem>
      <ToggleGroupItem value="video">Videa</ToggleGroupItem>
    </ToggleGroup>
  )
}
