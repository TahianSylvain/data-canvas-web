import "./buttons.css"
import Link from "next/link"

export default function Button({children, color="", icon="", style="", href=""}){


    const c = color ? " btn-" + color : ""
    const t = style ? " btn-style-" + style : ""

    const class_name = "btn" + c + t

    const btn_content = <>
        <span className="btn-icon material-icons-round">{icon}</span>
        <span>
            {children}
        </span>
    </>
    
    // If href not null <a> else <button>
    if (href) {
        return <Link href={href} className={class_name}>
            {btn_content}
        </Link>
    } else {
        return <button className={class_name}>
            {btn_content}
        </button>
    }
}