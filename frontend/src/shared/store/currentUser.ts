import { create } from 'zustand'
import type { Teacher } from '../types'

interface CurrentUserState {
  user: Teacher | null
  isLoading: boolean
  error: string | null
  fetchMe: () => Promise<void>
}

export const useCurrentUserStore = create<CurrentUserState>(set => ({
  user: null,
  isLoading: false,
  error: null,

  fetchMe: async () => {
    set({ isLoading: true, error: null })

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`)

      if (!res.ok) {
        throw new Error(`Failed to load /me: ${res.status}`)
      }

      const data = (await res.json()) as Teacher

      set({ user: data, isLoading: false })
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Unknown error',
        isLoading: false,
      })
    }
  },
}))
