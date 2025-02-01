import { CheckboxInput, SelectInput, TextInput } from "@/components/inputs/Inputs";

export default function TestInputs() {
    return <div className="p-3">
        {/* -- INPUTS -- */}
        <div>
            <h2 className="text-3xl mb-2">Inputs</h2>
            <div className="gap-4">
                <div className="flex flex-col">
                    <p className="text-xs font-thin mb-2">Input text</p>
                    <TextInput placeholder={"Nom (facultatif)"} name={"name"}/>
                </div>
                <div className="flex flex-col mt-2">
                    <p className="text-xs font-thin mb-2">Select</p>
                    <SelectInput placeholder={"Nom (facultatif)"} name={"name"} choices={["choice 1", "choice 2"]}/>
                </div>
                <div className="flex flex-col mt-2">
                    <p className="text-xs font-thin mb-2">Checkbox</p>
                    <CheckboxInput placeholder={"Nom (facultatif)"} name={"name"}/>
                </div>
            </div>
        </div>
        {/* -- END INPUTS -- */}
    </div>
}