import Button from "../buttons/buttons"
import "./forms.css"
import Link from "next/link"
import { FormTextInput } from "../inputs/formInputs"


export default function LoginForm() {
    return <div className="login-form-container login-form-container-color">
        <div className="text-4xl font-extrabold text-blue-300 login-form-logo">
            DC
        </div>
        <form action="" className="flex flex-grow flex-col justify-between">
            <div className="login-form-content grid grid-cols-1 sm:grid-cols-2 mt-5">
                <div className="flex flex-col gap-3 mb-8">
                    <div>
                        <h1 className="text-3xl">Connexion</h1>
                    </div>
                    <div>
                        <p>Utilisez votre compte google</p>
                    </div>
                </div>
                <div>
                    <div className="mb-7">
                        <div>
                            <FormTextInput name={"email"} placeholder={"Adresse e-mail ou téléphone"}></FormTextInput>
                        </div>
                        <Link href="#">Adresse e-mail oubliée ?</Link>
                    </div>
                    <div>
                        <p>S'il ne s'agit pas de votre ordinateur, utilisez une fenêtre de navigation privée pour vous connecter. En savoir plus sur l'utilisation du mode Invité</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-4 mt-8 sel">
                <Button href="#" color="primary">Créer un compte</Button>
                <Button style="fill">Suivant</Button>
            </div>
        </form>
    </div>
}