import Button from "@/components/buttons/buttons"

export default function TestButtons() {

    const events = {
        onClick: () => alert("Click !")
    }

    return <div className="p-3">
        {/* -- BUTTONS -- */}
        <div>
            <h2 className="text-3xl mb-2">Buttons</h2>
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">.btn</p>
                    <Button>button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">.btn.btn-primary</p>
                    <Button color="primary">button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">.btn.btn-type-fill</p>
                    <Button style="fill">button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">.btn.btn-type-border</p>
                    <Button style="border">button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">.btn .btn-primary .btn-type-border</p>
                    <Button color="primary" style="border">button</Button>
                </div>
            </div>
        </div>
        {/* -- END BUTTONS -- */}

        {/* -- LINKS -- */}
        <div>
            <h2 className="text-3xl mb-2">Links</h2>
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">a.btn</p>
                    <Button href="#">button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">a.btn.btn-primary</p>
                    <Button href="#" color="primary">button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">a.btn.btn-type-fill</p>
                    <Button href="#" style="fill">button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">a.btn.btn-type-border</p>
                    <Button href="#" style="border">button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">.btn.btn-primary.btn-type-border</p>
                    <Button href="#" color="primary" style="border">button</Button>
                </div>
            </div>
        </div>
        {/* -- END LINKS -- */}

        {/* -- BUTTONS WITH ICONS -- */}
        <div>
            <h2 className="text-3xl mb-2">Buttons with google rounded material icon</h2>
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">.btn</p>
                    <Button icon="home">button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">.btn.btn-primary</p>
                    <Button icon="add" color="primary">button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">.btn.btn-type-fill</p>
                    <Button icon="close" style="fill">button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">.btn.btn-type-border</p>
                    <Button icon="menu" style="border">button</Button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-thin mb-2">.btn .btn-primary .btn-type-border</p>
                    <Button icon="drag_indicator" color="primary" style="border">button</Button>
                </div>
            </div>
        </div>
        {/* -- END BUTTONS -- */}
    </div>

}