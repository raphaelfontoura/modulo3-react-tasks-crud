import { FC } from "react";

type FormErrorProps = {
    errorMessage: string
}

export const FormError: FC<FormErrorProps> = ({ errorMessage }) => {
    if (!errorMessage) return null;

    return (
        <p className="px-4 py-2 bg-red-500 text-white font-bold text-sm rounded-lg">
            {errorMessage}
        </p>
    );

}