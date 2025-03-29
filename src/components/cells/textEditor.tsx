
export default function TextEditor() {
    // TODO: implement the following features for the CODE EDITOR cell
    // - https://highlightjs.org/ for syntax highlight
    // - https://www.npmjs.com/package/react-contenteditable to make a nice editable div - https://blixtdev.com/how-to-use-contenteditable-with-react/ to understand this package
    

    return <>
        <div className="h-fit w-full bg-slate-800 flex justify-start items-stretch">
            {/* CELL NUMBER */}
            <div className="w-10 h-auto flex justify-around py-3 px-1">
                <p>[ 2 ]</p>
            </div>

            {/* CODE EDITOR */}
            <div className="h-auto w-full px-2 py-3">
                {/* <textarea placeholder="Your code goes here" className="w-full"></textarea> */}
                <div contentEditable="true"> lorem ipsum</div>
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br></br> Sint ullam incidunt nesciunt laboriosam. <br></br> Voluptate quos, aliquam veniam odio quod laboriosam consectetur error mollitia. <br></br> Consectetur minus dolorem omnis eius cupiditate? Laborum.</p> */}
            </div>
        </div>
    </>
}
