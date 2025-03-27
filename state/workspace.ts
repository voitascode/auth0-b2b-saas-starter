import { atom } from "jotai"
import { atomWithQuery } from "jotai-tanstack-query"
import { atomWithStorage } from "jotai/utils"

import { atomWithHydration } from "@/lib/jotai"

import { userAtom } from "./user"

const BASE_URL = process.env.APP_BASE_URL

const activeWorkspaceIdFromStorageAtom = atomWithStorage<string | null>(
  "activeWorkspace",
  null
)

export const activeWorkspaceIdNullableAtom = atom(
  (get) => {
    const { user } = get(userAtom)
    const activeAccountFromStorage = get(activeWorkspaceIdFromStorageAtom)

    if (
      activeAccountFromStorage !== null &&
      user.workspace_id === activeAccountFromStorage
    ) {
      return activeAccountFromStorage
    }

    return user.workspace_id
  },
  (_get, set, activeWorkspace: string | null) => {
    set(activeWorkspaceIdFromStorageAtom, activeWorkspace)
  }
)

export const workspaceHydrationAtom = atomWithHydration()
