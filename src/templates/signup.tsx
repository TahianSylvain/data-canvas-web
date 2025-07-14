'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/cards/card"
import { Input } from "@/components/inputs/input"
import { Button } from "@/components/buttons/button"
import { useRouter } from "next/navigation"

import { createUser, login } from "@/services/anmaClient"

export function Signup() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        if (!username || !password || !confirmPassword) {
            setError("Tous les champs sont obligatoires.")
            return
        }
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.")
            return
        }

        setLoading(true)
        try {
            await createUser({ username, password })

            // Direct login après création
            const auth = await login(username, password)
            if (!auth.accessToken) throw new Error("Impossible de se connecter automatiquement")

            // Stocke ton token où tu veux : localStorage, contexte, state global, etc.
            localStorage.setItem("token", auth.accessToken)

            setSuccess(true)
            setUsername("")
            setPassword("")
            setConfirmPassword("")

            // Redirection possible ici si tu veux
            // router.push("/dashboard")
            router.push("/")

        } catch (err: any) {
            setError(err?.message || "Erreur lors de la création du compte ou connexion.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center bg-background w-screen h-screen">
            <Card>
                <div className="flex justify-between m-2">
                    <span className="text-sm font-bold">Create new account</span>
                    <h1>
                        <Image src={"/logo.png"} width={110} height={32} alt="logo" />
                    </h1>
                </div>
                <form className="p-[22px]" onSubmit={handleSubmit}>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
                        {error && <div className="mb-2 text-red-600">{error}</div>}
                        {success && <div className="mb-2 text-green-600">Compte créé et connecté !</div>}

                        <Input
                            label="Username"
                            id="username"
                            input_type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mb-4"
                        />
                        <Input
                            label="Password"
                            id="password"
                            input_type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-4"
                        />
                        <Input
                            label="Confirm your password"
                            id="confirm_password"
                            input_type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mb-4"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <Link href={"/login"} className="font-semibold">
                            Already have an account?
                        </Link>
                        <Button disabled={loading} className="px-8 bg-bluePrimary text-white" type="submit">
                            {loading ? "Création..." : "Create"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

