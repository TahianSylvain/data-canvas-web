import "./buttons.css"

export default function Button({children, color="", style="", href=""}){


    const c = color ? " btn-" + color : ""
    const t = style ? " btn-style-" + style : ""

    const class_name = "btn" + c + t

    const btn_content = <>
        <span></span>
        <span>
            {children}
        </span>
    </>
    
    // If href not null <a> else <button>
    if (href) {
        return <a href={href} className={class_name}>
            {btn_content}
        </a>
    } else {
        return <button className={class_name}>
            {btn_content}
        </button>
    }
}