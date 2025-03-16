import Button from "../buttons/buttons"

export default function ButtonIsland() {
    // TODO: ajout border sur le div wrapper et padding de 2 px un peu a gouche a droite
    return <div className="flex justify-between w-64 h-8">
        {/* This is the div wrapper */}
        <Button icon="arrow_upward"></Button>
        <Button icon="arrow_downward"></Button>
        <Button icon="star"></Button>
        <Button icon="link"></Button>
        <Button icon="settings"></Button>
        <Button icon="content_copy"></Button>
        <Button icon="delete"></Button>
        <Button icon="more_vert"></Button>
        
    </div>
}