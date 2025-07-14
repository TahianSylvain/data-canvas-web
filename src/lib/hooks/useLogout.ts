'use client'

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/services/store"

export function useLogout() {
  const router = useRouter()

  const resetStore = useAppStore(state => state.reset) // ← on prépare la fonction de reset
  const setToken = useAppStore(state => state.setToken)

  const logout = useCallback(() => {
    // 1. Supprime le token du localStorage
    localStorage.removeItem("accessToken")

    // 2. Réinitialise Zustand
    setToken(null)
    resetStore?.()

    // 3. Redirige vers login
    router.push("/login")
  }, [router, resetStore, setToken])

  return logout
}

