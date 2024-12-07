import React from "react";
import { FormData } from "../utils/formData";
import { fields } from "../imports";

interface InputFieldsProps {
    data: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFields: React.FC<InputFieldsProps> = ({
    data, handleChange
}) => (
    <div className='left-container'>
        {fields.map((field) => (
        <div 
            key={field.name}
            className='container'
        >
            <input
            type='text'
            id={field.name}
            name={field.name}
            value={data[field.name as keyof FormData]}
            onChange={handleChange}
            className="input"
            required
            />
            <label 
            htmlFor={field.name}
            className='label'
            >
            {field.label}
            </label>
        </div>
        ))}
    </div>
)

export default InputFields;