import { atom } from "jotai"
import { atomWithQuery } from "jotai-tanstack-query"

import { appClient } from "@/lib/auth0"
import { atomWithHydration } from "@/lib/jotai"

const BASE_URL = process.env.APP_BASE_URL

export const userHydrationAtom = atomWithHydration()

export const userQueryAtom = atomWithQuery((get) => ({
  queryKey: ["user"],
  queryFn: async () => {
    const session = await appClient.getSession()
    const res = await fetch(`${BASE_URL}/api/users/get`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session }),
      credentials: "include",
    })
    console.log(session)
    const user = await res.json()
    return user
  },
  initialData: get(userHydrationAtom),
}))

export const userAtom = atom((get) => get(userQueryAtom))
