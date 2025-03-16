import ButtonIsland from "./buttonIsland";
import TextEditor from "./textEditor";

export default function Cell () {
    return <div className="container flex ">
        <TextEditor ></TextEditor>
        <ButtonIsland ></ButtonIsland>
    </div>
}