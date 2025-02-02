import Button from "../buttons/buttons"
import "./forms.css"
import Link from "next/link"
import { TextInput } from "../inputs/Inputs"


export default function LoginForm() {
    return <div className="login-form-container">
        <div className="text-4xl">
            LOGO
        </div>
        <form action="" className="mt-2">
            <div className="login-form-content grid grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-3 mb-3">
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
                            <TextInput name={"email"} placeholder={"Adresse e-mail ou téléphone"}></TextInput>
                        </div>
                        <Link href="#">Adresse e-mail oubliée ?</Link>
                    </div>
                    <div>
                        <p>S'il ne s'agit pas de votre ordinateur, utilisez une fenêtre de navigation privée pour vous connecter. En savoir plus sur l'utilisation du mode Invité</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
                <Button href="#" color="primary">Créer un compte</Button>
                <Button style="fill">Suivant</Button>
            </div>
        </form>
    </div>
}