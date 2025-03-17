import ButtonIsland from "@/components/cells/buttonIsland";
import Cell from "@/components/cells/cell";
import TextEditor from "@/components/cells/textEditor";

export default function TestCells () {

    return <div className="p-5 flex flex-col gap-2">
        {/* simplement ButtonIsland */}
        <div>
            <p>button island / toolbar</p>
            <ButtonIsland></ButtonIsland>
        </div>

        {/* simplement TextEditor */}
        <div>
            <p>text editor only</p>
            <TextEditor></TextEditor>
        </div>

        {/* atambatra amin'izay */}
        <div>
            <p>cell en entier</p>
            <Cell></Cell>
        </div>
    </div>
}