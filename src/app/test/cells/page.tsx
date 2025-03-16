import ButtonIsland from "@/components/cells/buttonIsland";
import Cell from "@/components/cells/cell";
import TextEditor from "@/components/cells/textEditor";

export default function TestCells () {

    return <div className="p-5 flex flex-col gap-2">
        {/* simplement ButtonIsland */}
        <div>
            <ButtonIsland></ButtonIsland>
        </div>

        {/* simplement TextEditor */}
        <div>
            <TextEditor></TextEditor>
        </div>

        {/* atambatra amin'izay */}
        <div>
            <Cell></Cell>
        </div>
    </div>
}