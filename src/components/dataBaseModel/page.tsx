import "./modelData.css"
import { IoMdAdd } from "react-icons/io";
interface dataType {
    name: string,
    type:string,
    color:string
};


export default function ModelData({name,type,color}:dataType) {
    const validateColor = ["blue", "green", "red", "yellow", "purple", 'beige'].includes(color)?  color: "gray";

    const class_contain_icon = `contain_icon ${validateColor}`;

    return (
        // <section className="contain_model_test">
        <div className="data_model hover:shadow-md">
            <div className={class_contain_icon}>
                <IoMdAdd size={40} />  
            </div>
            <div className="contain_text_1">
                <p className="name_base">{name}</p>
                <span className="sous_text">{type}</span>
            </div>
        </div>
        // </section>
    );
}