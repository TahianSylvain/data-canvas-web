import ButtonIsland from "@/components/cells/buttonIsland";
import Cell from "@/components/cells/cell";
import TextEditor from "@/components/cells/textEditor";

export default function TestCells () {

    return <div className="p-5 flex flex-col gap-2">
        {/* simplement ButtonIsland */}
        <div className="relative h-8">
            <p className="absolute right-72">button island / toolbar</p>
            <ButtonIsland></ButtonIsland>
        </div>

        {/* simplement TextEditor */}
        <div className="relative h-auto">
            <p>text editor only</p>
            <TextEditor></TextEditor>
        </div>

        {/* atambatra amin'izay */}
        <div className="relative h-auto">
            <p>cell en entier</p>
            <Cell></Cell>
        </div>
    </div>
}