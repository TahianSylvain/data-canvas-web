'use client'
// pour les petits boutons add cell et add md text
import { ButtonWithTextBorder } from "./new_buttons"
// interface IAddButtonProps {
//     type: "python" | "markdown"
// }

export default function AddButtons () { // { type } : IAddButtonProps) {

    return <div className="relative my-2 flex justify-center">
        <div className="relative z-10 ">
            <ButtonWithTextBorder text={"Code"} onClick={() => console.log("tralala")} icon={"add"} />
        </div>
        <span className="h-1 absolute z-1 top-1/2 left-5 right-5 bg-[#dcdcdc]" />
    </div>
}