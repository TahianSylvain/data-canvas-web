'use client'
import { useState } from "react";
import ButtonCreat from "../../components/btn_new/page";
import ModelData from "../../components/dataBaseModel/page";
import CreateDatabaseForm from "@/components/createDatabaseForm/page";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";

export default function Acceuil() {
    // const [visibility, setVisibility] = useState("hidden");
    const [dataHome, setDataHome] = useState({
        visibility: 'hidden',
        nameForm: 'Database'
    });

    const data = {
        text_btn:'New Database',
        text_btn2:'New Notebook',
        color:'green',
        color2:'blue',
        // -----------------------
        color_dataModel: 'blue',
        color_dataModel2: 'red',
        color_dataModel3: 'purple',
        color_dataModel4: 'green',
        color_dataModel5: 'beige',
        color_dataModel6: 'blue',
        
        name: 'Motorcicles database',
        type:'Database',

        name2: 'Motorcicles database',
        type2:'Database',
        
        name3: 'Motorcicles database',
        type3:'Database',
        
        name4: 'Motorcicles database',
        type4:'Database',
        
        name5: 'Motorcicles database',
        type5:'Database',
        
        name6: 'Motorcicles database',
        type6:'Database',
        // -----------------------
    }
    const handleClick = (e)=>{
        const textContentList = e.target.textContent.split(' ');
        const _name = textContentList[textContentList.length - 1];
        
        
        if(_name != 'Cancel'){
            setDataHome(
                (prev) =>({
                    nameForm: _name,
                    visibility: prev.visibility == 'hidde'? 'show':'hidde'
                })
                
            )
        }else{
            setDataHome(
                (prev) =>({
                    ...prev,
                    visibility: prev.visibility == 'hidde'? 'show':'hidde'
                })
                
            )
        }
        console.log(_name);
        console.log(dataHome.nameForm);
        // setVisibility()
    }

    return (
        <>
        <Header/>
        <Sidebar/>
        <CreateDatabaseForm handleClick={handleClick} visibility = {dataHome.visibility} nameForm={dataHome.nameForm}></CreateDatabaseForm>
        <section className="contain_menu_acceuil">

            <section className="contain_sous_menu_acceuil">
                <div className="container_1">
                    <h4 className="sous_titre_1">ISPM - Parking</h4>

                    <div>
                        <ButtonCreat handleClick={handleClick} text_btn={data.text_btn} color={data.color}/>
                        <ButtonCreat handleClick={handleClick} text_btn={data.text_btn2} color={data.color2}/>
                    </div>
                </div>
                <div className="container_2">
                    <p className="sous_titre_2">Databases</p>
                    <div className="sous_container_1">
                        <ModelData name={data.name} type={data.type} color={data.color_dataModel}/>
                        <ModelData name={data.name2} type={data.type2} color={data.color_dataModel2}/>
                        <ModelData name={data.name3} type={data.type3} color={data.color_dataModel3}/>
                    </div>
                    <p className="sous_titre_2">Notebooks</p>
                    <div className="sous_container_1">
                        <ModelData name={data.name5} type={data.type5} color={data.color_dataModel5}/>
                        <ModelData name={data.name6} type={data.type6} color={data.color_dataModel6}/>
                        {/* <ModelData name={data.name6} type={data.type6} color={data.color_dataModel6}/> */}
                    </div>
                </div>
            </section>

        </section>
        </>
    );
}