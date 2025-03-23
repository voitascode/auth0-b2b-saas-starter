'use client'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function ExportDropdown({ data }: { data: any[] }) {
  const downloadFile = (type: 'json' | 'csv') => {
    let blob
    let filename = `ads-export.${type}`

    if (type === 'json') {
      blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      })
    } else {
      const header = Object.keys(data[0] || {}).join(',')
      const rows = data.map((obj) =>
        Object.values(obj).map((val) => `"${String(val).replace(/"/g, '""')}"`).join(',')
      )
      blob = new Blob([header + '\n' + rows.join('\n')], {
        type: 'text/csv',
      })
    }

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Export</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => downloadFile('json')}>Exportovat jako JSON</DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadFile('csv')}>Exportovat jako CSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
