import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/cards/card"
import { Input } from "@/components/inputs/input"
import { Button } from "@/components/buttons/button"

export function Login() {
    return <div className="flex items-center justify-center bg-background w-screen h-screen">
        <Card>
            <div className="flex justify-between m-2">
                <span className="text-sm font-bold">Welcome</span>
                <h1>
                    <Image src={"/logo.png"} width={110} height={32} alt="logo" />
                </h1>
            </div>
            <div className="p-[22px]">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Login</h2>
                    <Input label="Username" id="username" input_type="text" className="mb-4"/>
                    <Input label="Password" id="password" input_type="password" className="mb-4"/>
                </div>
                <div className="flex justify-between items-center">
                    <Link href={"/signup"} className="font-semibold">Don't have an account?</Link>
                    <Button className="px-8 bg-bluePrimary text-white">Login</Button>
                </div>
            </div> 
        </Card>
    </div>
}
