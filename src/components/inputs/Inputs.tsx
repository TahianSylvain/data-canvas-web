import "./inputs.css"
import { Str } from "@/lib/dash/str"

export function TextInput({placeholder, name}){

    const unique = Str("").randomNumber(5)
    const id = Str(name).concat(unique, "-")

    return <div className="input">
        <label className="input-label" htmlFor={id}>{placeholder}</label>
        <input className="input-self" type="text" name={name} id={id} />
    </div>
}

export function SelectInput({placeholder, name, choices}){

    const unique = Str("").randomNumber(5)
    const id = Str(name).concat(unique, "-")

    return <div className="input">
        <label className="input-label" htmlFor={id}>{placeholder}</label>
        <select className="input-self" name={name} id={id}>
            {
                choices.map((el, idx) => {
                    return <option key={Str(el).concat(idx, "-")} value={Str(el).camelize()}>{el}</option>
                })
            }
        </select>
    </div>
}

export function CheckboxInput({placeholder, name}) {
    const unique = Str("").randomNumber(5)
    const id = Str(name).concat(unique, "-")

    return <div className="input-checkbox">
        <input className="input-self" type="checkbox" name={name} id={id} />
        <label className="input-label" htmlFor={id}>{placeholder}</label>
    </div>
}