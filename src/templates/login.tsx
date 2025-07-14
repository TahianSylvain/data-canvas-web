'use client'

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/cards/card"
import { Input } from "@/components/inputs/input"
import { Button } from "@/components/buttons/button"
import { login } from "@/services/anmaClient"
import { useRouter } from "next/navigation"

export function Login() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await login(username, password) // ta fonction login existante

      if (result.accessToken) {
        // stocker token (localStorage, cookie, etc.)
        localStorage.setItem("accessToken", result.accessToken)
        // puis rediriger
        router.push("/")
      } else {
        alert("Connexion échouée")
      }
    } catch (e) {
      alert("Erreur lors de la connexion")
    }
  }

  return (
    <div className="flex items-center justify-center bg-background w-screen h-screen">
      <Card>
        <div className="flex justify-between m-2">
          <span className="text-sm font-bold">Welcome</span>
          <h1>
            <Image src={"/logo.png"} width={110} height={32} alt="logo" />
          </h1>
        </div>
        <form className="p-[22px]" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <Input
              label="Username"
              id="username"
              input_type="text"
              className="mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Password"
              id="password"
              input_type="password"
              className="mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-red-600 mb-4">
              {error}
            </div>
          )}
          <div className="flex justify-between items-center">
            <Link href={"/signup"} className="font-semibold">
              Don't have an account?
            </Link>
            <Button
              className="px-8 bg-bluePrimary text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

