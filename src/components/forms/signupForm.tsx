import Button from "../buttons/buttons"
import "./forms.css"
import Link from "next/link"
import { FormTextInput } from "../inputs/formInputs"


export default function SignupForm() {
    return <div className="login-form-container login-form-container-color">
        <div className="text-4xl font-extrabold text-blue-300 login-form-logo">
            DC
        </div>
        <form action="" className="flex flex-grow flex-col justify-between">
            <div className="login-form-content grid grid-cols-1 sm:grid-cols-2 mt-5">
                <div className="flex flex-col gap-3 mb-8">
                    <div>
                        <h1 className="text-3xl">Créer un compte DataCanvas</h1>
                    </div>
                    <div>
                        <p>Saisissez vos informations</p>
                    </div>
                </div>
                <div>
                    <div className="mb-7">
                        <div className="mb-7">
                            <FormTextInput name={"name"} placeholder={"Nom"}></FormTextInput>
                        </div>
                        <div className="mb-7">
                            <FormTextInput name={"firstname"} placeholder={"Prénom"}></FormTextInput>
                        </div>
                        <div className="mb-7">
                            <FormTextInput name={"email"} placeholder={"Adresse e-mail"}></FormTextInput>
                        </div>
                        <div className="mb-7">
                            <FormTextInput name={"password"} placeholder={"Mot de passe"}></FormTextInput>
                        </div>
                        <div>
                            <FormTextInput name={"confirm"} placeholder={"Confirmer votre mot de passe"}></FormTextInput>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-4 mt-8 sel">
                <Button style="fill">Suivant</Button>
            </div>
        </form>
    </div>
}