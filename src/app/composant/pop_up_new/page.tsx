'use client'

import { useState } from "react";
import './new_tab.css'
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/buttons/button";

export default function FormNewTab() {
    const [formData, setFormData] = useState({
        table_name: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(
            prev => ({
                ...prev,
                [name]:value
            })
        )
    }
    
    return(
        <div className="contain_form_newTab">
            <div className="contain_text_icon flex items-center justify-between">
                <p className="p1">Create table</p>
                <IoMdClose size={24} />
            </div>
            <form className="form_1 p-4 space-y-4">
                <label className="font-bold">Table name</label>
                <input
                    type="text"
                    id="table_name"
                    name="table_name"
                    value={formData.table_name}
                    onChange={handleChange}
                    className="inpt_nameTab border p-2 rounded w-full"
                    placeholder="Nom table"
                />
                <div className="flex items-center justify-end">
                    <Button>{'Cancel'}</Button>
                </div>
            </form>
        </div>
        
    );
}