import { Str } from "@/lib/dash/str"
import "./inputs.css"
// import "./../forms/forms.css"

export function FormTextInput({placeholder, name}){
    const unique = Str("").randomNumber(5)
    const id = Str(name).concat(unique, "-")

    return <div className="form-input">
        <label className="form-input-label login-form-container-color" htmlFor={id}>{placeholder}</label>
        <input className="form-input-self" type="text" name={name} id={id} />
    </div>
}