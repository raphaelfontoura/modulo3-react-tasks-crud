import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    setValue: Dispatch<SetStateAction<string>>;
};

export const FormInput: FC<FormInputProps> = ({ id, label, value, setValue, ...inputProps }) => (

    <fieldset className="grid">
        <label className="text-[#7b7c7b]" htmlFor={id}>
            {label}
        </label>
        <input
            className="px-2 py-1 text-[#7b7c7b] border border-[#d9d9d9] focus:border-[#b2b2b2] hover:border-[#b2b2b2] outline-none shadow-md rounded-lg"
            id={id}
            name={id}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...inputProps}
        />
    </fieldset>

);
