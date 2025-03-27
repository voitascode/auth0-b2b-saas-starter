"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { organizationAuth0 } from "@/dataTest"
import { neon } from "@neondatabase/serverless"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type Brand = {
  id: string
  name: string
}

export default function BrandPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [brandName, setBrandName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddBrand = async () => {
    if (!brandName) return

    setLoading(true)
    toast("Přidávám nový brand…")
    console.log(brandName)
    try {
      const res = await fetch("/api/brands/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: brandName }),
        credentials: "include",
      })
      console.log(res)

      if (!res.ok) throw new Error()
      const brand = await res.json()

      toast.success("Brand úspěšně přidán")
      setBrands((prev) => [...prev, brand])
      setBrandName("")
    } catch (err) {
      toast.error("Chyba při přidávání brandu")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Přehled brandů</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Přidat nový brand</Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="mb-4 text-lg font-medium">
              Zadej URL Facebook Page
            </h2>
            <Input
              placeholder="https://www.facebook.com/..."
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
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
      {/* <form action={create}>
    <input type="text" placeholder="write a comment" name="comment" />
    <button type="submit">Submit</button>
  </form> */}
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left">Brand</th>
              <th className="px-4 py-2 text-left">Akce</th>
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
                <td
                  colSpan={2}
                  className="py-6 text-center text-muted-foreground"
                >
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
