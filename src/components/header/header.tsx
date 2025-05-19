import Image from "next/image";
import { ReactNode } from "react";
import { FaBars, FaRegUser } from "react-icons/fa6";

type PropsType = {
	children?: ReactNode
}

export default function Header({children}: PropsType) {

	if(!children) {
		children = <h1>
			<Image src={"/logo.png"} width={110} height={32} alt="logo" className=""/>
		</h1>
	}

	return <>
		<div className="w-full h-max flex items-center justify-between px-6 py-4 border-b border-borderColor">
			<div className="flex items-center justify-between gap-8">
				<button>
					<FaBars size={24} />
				</button>
				{children}
			</div>
			<div className="bg-[#6368C7] rounded-full p-2">
				<FaRegUser size={18} className="text-white"/>
			</div>
		</div>
	</>
}