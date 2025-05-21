import ButtonIsland from "./buttonIsland";
import CodeEditor from "./textEditor";
import AddButtons from "./addCellButtons"

// TODO: add the little buttnos to add a new cell,
//     whether for a new programming cell or for a new text Cell.

export default function Cell() {
    return <div className="relative flex flex-col"> {/* container */ }
        <ButtonIsland ></ButtonIsland>
        <CodeEditor ></CodeEditor>
        <AddButtons></AddButtons>
    </div>
}