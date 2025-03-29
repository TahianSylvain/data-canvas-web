import ButtonIsland from "./buttonIsland";
import TextEditor from "./textEditor";

// TODO: add the little buttnos to add a new cell,
//     whether for a new programming cell or for a new text Cell.

export default function Cell() {
    return <div className="relative flex "> {/* container */ }
        <ButtonIsland ></ButtonIsland>
        <TextEditor ></TextEditor>
    </div>
}