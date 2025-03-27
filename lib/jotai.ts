import { atomWithLazy } from "jotai/utils"

export function atomWithHydration<T>(message?: string) {
  return atomWithLazy<T>(() => {
    throw new Error("Atom not hydrated. " + (message ?? ""))
  })
}
