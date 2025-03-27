import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PRIVAT_SUPABASE_URL!,
    process.env.NEXT_PRIVAT_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
// export async function createClient() {
//   const cookieStores = await cookies()
//   return createServerClient(
//     process.env.NEXT_PRIVAT_SUPABASE_URL!,
//     process.env.NEXT_PRIVAT_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStores.get(name)?.value
//         },
//         set(name: string, value: string, options: any) {
//           cookieStores.set({ name, value, ...options })
//         },
//         remove(name: string, options: any) {
//           cookieStores.set({ name, value: "", ...options })
//         },
//       },
//     }
//   )
// }
