import Link from "next/link"
import { IoMdAdd } from "react-icons/io"

const CONTENTS = {
	create_section: [
		{label: "New workspace", bgColor: "#5DAF79"},
		{label: "New from template", bgColor: "#5D81AF"}
	],
	other_section: [
		{
			section_title: "Workspaces",
			section_content: [
				{label: "Untitled workspace", href:''},
				{label: "ISPM - Webpage", href:''},
				{label: "ISPM - Parkings", href:''}
			]
		}
	]
}


export default function Sidebar() {
	return <>
		<div className="float_sidebar flex flex-col w-72 h-full py-4 px-5 border-r border-borderColor bg-foreground">
			<div className="flex flex-col mb-2">
				{CONTENTS.create_section.map((item, id) => {
					return <button key={id} className="flex items-center gap-3 p-2 px-4">
						<span className={`h-6 w-6 text-white flex items-center justify-center rounded-md`}
							style={{backgroundColor: `${item.bgColor}`}}
						>
							<IoMdAdd size={18} />
						</span>
						<span>{item.label}</span>
					</button>
				})}
			</div>
			<div>
				{CONTENTS.other_section.map((section, id) => {
					return <div key={id}>
						<span className="font-bold">{section.section_title}</span>
						<div className="mt-2 flex flex-col">
							{section.section_content.map((item, id) => {
								return <Link 
									key={id}
									href={item.href}
									className="p-2 px-4 text-[13px] font-light hover:bg-[#EDEDED] rounded-lg"
								>{item.label}</Link>
							})}
						</div>
					</div>
				})}
			</div>
		</div>
	</>
} 