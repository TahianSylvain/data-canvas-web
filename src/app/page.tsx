'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Acceuil from "./home/page"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      router.push("/login") // pas de token => redirection vers login
    }
  }, [router])

  // Affiche la page seulement si token trouvé
  return <Acceuil />
}
