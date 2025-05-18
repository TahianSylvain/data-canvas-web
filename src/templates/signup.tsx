'use client'

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/cards/card"
import { Input } from "@/components/inputs/input"
import { Button } from "@/components/buttons/button"

export function Signup() {
    return <div className="flex items-center justify-center bg-background w-screen h-screen">
        <Card>
            <div className="flex justify-between m-2">
                <span className="text-sm font-bold">Create new account</span>
                <h1>
                    <Image src={"/logo.png"} width={110} height={32} alt="logo" />
                </h1>
            </div>
            <form className="p-[22px]">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Signup</h2>
                    <Input label="Username" id="username" input_type="text" className="mb-4"/>
                    <Input label="Password" id="password" input_type="password" className="mb-4"/>
                    <Input label="Confirm your password" id="confirm_password" input_type="password" className="mb-4"/>
                </div>
                <div className="flex justify-between items-center">
                    <Link href={"/login"} className="font-semibold">Already have an account?</Link>
                    <Button className="px-8 bg-bluePrimary text-white" type="submit">Create</Button>
                </div>
            </form> 
        </Card>
    </div>
}
