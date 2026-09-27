import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from "react";

interface FormInputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    setValue: Dispatch<SetStateAction<string>>;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
};

export const FormInputPassword: FC<FormInputPasswordProps> = ({ id, label, value, setValue, visible, setVisible, ...inputProps }) => (

    <fieldset className="grid">
        <label className="text-[#7b7c7b]" htmlFor={id}>
            {label}
        </label>
        <div className="relative flex items-center">
            <input
                className="w-full pl-2 pr-8 py-1 text-[#7b7c7b] border border-[#d9d9d9] focus:border-[#b2b2b2] hover:border-[#b2b2b2] outline-none shadow-md rounded-lg"
                id={id}
                name={id}
                type={visible ? "text" : "password"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                {...inputProps}
            />
            <button
                className="cursor-pointer absolute right-2"
                type="button"
                onClick={() => setVisible((show) => !show)}>
                👁️‍🗨️
            </button>
        </div>
    </fieldset>

);
