import Button from "./legacy_buttons/buttons"
import "tailwindcss"

export default function ButtonIsland() {

    return <div className="flex justify-between w-64 h-8 rounded-lg mode-dark shadow-lg absolute right-4 top-[-18px] p-0.5 z-index z-10">
        {/* This is the div wrapper */}
        <Button icon="arrow_upward"></Button>
        <Button icon="arrow_downward"></Button>
        <Button icon="star"></Button> {/*j'ai pas trouve le nom d'icone pour l'etoile a 4 branches*/}
        <Button icon="link"></Button>
        <Button icon="settings"></Button>
        <Button icon="content_copy"></Button>
        <Button icon="delete"></Button>
        <Button icon="more_vert"></Button>

    </div>
}