import Link from "next/link"
import { IoMdAdd } from "react-icons/io"

export type SidebarItem = {
	label: string;
	href?: string;
	bgColor?: string;
	onClick?: () => void; // ← AJOUT
}

export type SidebarSection = {
	section_title?: string;
	section_content: SidebarItem[];
}

export type SidebarProps = {
	createSections: SidebarItem[];
	otherSections: SidebarSection[];
}

export default function Sidebar({ createSections, otherSections }: SidebarProps) {
	return (
		<aside className="flex flex-col min-w-64 py-4 px-5 border-r border-borderColor bg-foreground">
			<div className="flex flex-col mb-4">
				{createSections.map((item, id) => (
					<button
						key={id}
						onClick={item.onClick} // ← ICI
						className="flex items-center gap-3 p-2 px-4 hover:bg-[#EDEDED] rounded-lg"
					>
						<span
							className="h-6 w-6 text-white flex items-center justify-center rounded-md"
							style={{ backgroundColor: item.bgColor || "#ccc" }}
						>
							<IoMdAdd size={18} />
						</span>
						<span>{item.label}</span>
					</button>
				))}
			</div>

			<div className="flex flex-col gap-4">
				{otherSections.map((section, i) => (
					<div key={i}>
						{section.section_title && (
							<span className="font-bold text-sm">{section.section_title}</span>
						)}
						<div className="mt-2 flex flex-col">
							{section.section_content.map((item, j) => (
								<button
									key={j}
									onClick={item.onClick}
									className="text-left p-2 px-4 text-[13px] font-light hover:bg-[#EDEDED] rounded-lg w-full"
								>
									{item.label}
								</button>
							))}
						</div>
					</div>
				))}
			</div>
		</aside>
	);
}

