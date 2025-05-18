import "./modelData.css"
import { IoMdAdd } from "react-icons/io";

export default function model_data() {
    return (
        // <section className="contain_model_test">
        <div className="data_model">
            <div className="contain_icon">
                <IoMdAdd size={40}/>
            </div>
            <div className="contain_text_1">
                <p className="name_base">Motorcycles database</p>
                <span className="sous_text">Database</span>
            </div>
        </div>
        // </section>
    );
}