'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

type Brand = {
  id: string
  name: string
}

export default function DashboardHome() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [newBrandUrl, setNewBrandUrl] = useState("")
  const [loading, setLoading] = useState(false)

  // Load brands from API
  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch(() => toast.error("Chyba při načítání brandů"))
  }, [])

  const handleAddBrand = async () => {
    if (!newBrandUrl) return

    setLoading(true)
    toast("Přidávám nový brand…")

    try {
      const res = await fetch("/app/api/brands/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newBrandUrl })
      })

      if (!res.ok) throw new Error()
      const brand = await res.json()

      toast.success("Brand úspěšně přidán")
      setBrands((prev) => [...prev, brand])
      setNewBrandUrl("")
    } catch (err) {
      toast.error("Chyba při přidávání brandu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full px-4 py-6 gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Přehled brandů</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Přidat nový brand</Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="text-lg font-medium mb-4">Zadej URL Facebook Page</h2>
            <Input
              placeholder="https://www.facebook.com/..."
              value={newBrandUrl}
              onChange={(e) => setNewBrandUrl(e.target.value)}
            />
            <Button
              className="mt-4 w-full"
              onClick={handleAddBrand}
              disabled={loading}
            >
              {loading ? "Přidávám…" : "Potvrdit"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-2">Brand</th>
              <th className="text-left px-4 py-2">Akce</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id} className="border-t">
                <td className="px-4 py-3">{brand.name}</td>
                <td className="px-4 py-3">
                  <Link href={`/dashboard/brands/${brand.id}`}>
                    <Button variant="outline" size="sm">
                      Detail
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}

            {brands.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center text-muted-foreground py-6">
                  Zatím žádné brandy.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
