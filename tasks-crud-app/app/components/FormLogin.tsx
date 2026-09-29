"use client";

import { useActionState, useState } from "react";
import { FormInput } from "./FormInput";
import { FormInputPassword } from "./FormInputPassword";
import { FormButton } from "./FormButton";
import { FormError } from "./FormError";

type FormLoginProps = {
    action: (previousState: string, formData: FormData) => Promise<string> | string;
};

export const FormLogin = ({ action }: FormLoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const [errorMessage, formAction, isPending] = useActionState(action, "");

    console.log(errorMessage);

    return (
        <>
            {!isPending &&
                <FormError errorMessage={errorMessage} />
            }
            <form className="grid gap-y-6" action={formAction}>
                
                <FormInput
                    id="email"
                    label="Email"
                    value={email}
                    setValue={setEmail}
                />
                <FormInputPassword
                    id="password"
                    label="Senha"
                    value={password}
                    visible={showPassword}
                    setValue={setPassword}
                    setVisible={setShowPassword}
                />
                
                <FormButton>Login</FormButton>

            </form>
        </>
    );

}