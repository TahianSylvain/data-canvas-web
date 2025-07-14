'use client'

import { useCallback } from "react"
import { useRouter } from "next/navigation"

export function useLogout() {
    const router = useRouter()

    const logout = useCallback(() => {
        // Supprime le token stocké
        localStorage.removeItem("accessToken")
        // Puis redirige vers la page login
        router.push("/login")
    }, [router])

    return logout
}
