import "./buttons.css"
import Link from "next/link"

interface ButtonProps {
    // voir https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#useful-react-prop-type-examples
    children?: React.ReactNode,
    color?: string,
    icon?: string,
    style?: string,
    href?: string,
    additionalCSS?: string
}

export default function Button({children, color="", icon="", style="", href="", additionalCSS=""} : ButtonProps){
    // additionalCSS: to override the actual hardcoded CSS built into "./buttons.css"

    const c = color ? " btn-" + color : ""
    const t = style ? " btn-style-" + style : ""

    const hasChildren = children ? true : false
    const buttonRectifierCSS = hasChildren ? null : "btn-textless"
    const iconRectifierCSS = hasChildren ? null : "btn-icon-textless"
    const materialRectifierCSS = hasChildren ? null : "material-icons-round-textless"
    
    const class_name = "btn " + c + t + additionalCSS + buttonRectifierCSS

    const btn_content = <>
        {/* <span className="btn-icon material-icons-round">{icon}</span> */}
        <span className={`btn-icon ${iconRectifierCSS} material-icons-round ${materialRectifierCSS}`}>{icon}</span>
        {   hasChildren && <span >
                {children}
            </span>
        }
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