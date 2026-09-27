"use client";

import { useActionState, useState } from "react";

type FormRegisterProps = {
    action: (previousState: string, formData: FormData) => Promise<string> | string;
};

export default function FormRegister({ action }: FormRegisterProps) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const [errorMessage, formAction, isPending] = useActionState(action, "");

    console.log(errorMessage);

    return (
        <>
            {!isPending && errorMessage &&
                <p className="px-4 py-2 bg-red-500 text-white font-bold text-sm rounded-lg">{errorMessage}</p>
            }
            <form className="grid gap-y-6" action={formAction}>
                <fieldset className="grid">
                    <label className="text-[#7b7c7b]" htmlFor="username">Usuário</label>
                    <input
                        className="px-2 py-1 text-[#7b7c7b] border border-[#d9d9d9] focus:border-[#b2b2b2] hover:border-[#b2b2b2] outline-none shadow-md rounded-lg"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </fieldset>
                <fieldset className="grid">
                    <label className="text-[#7b7c7b]" htmlFor="email">Email</label>
                    <input
                        className="px-2 py-1 text-[#7b7c7b] border border-[#d9d9d9] focus:border-[#b2b2b2] hover:border-[#b2b2b2] outline-none shadow-md rounded-lg"
                        id="email"
                        name="email"
                        // type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset className="grid">
                    <label className="text-[#7b7c7b]" htmlFor="password">Senha</label>
                    <div className="relative flex items-center">
                        <input
                            className="w-full pl-2 pr-8 py-1 text-[#7b7c7b] border border-[#d9d9d9] focus:border-[#b2b2b2] hover:border-[#b2b2b2] outline-none shadow-md rounded-lg"
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            // minLength={6}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="cursor-pointer absolute right-2"
                            type="button"
                            onClick={() => setShowPassword((show) => !show)}>
                            👁️‍🗨️
                        </button>
                    </div>
                </fieldset>
                <button
                    className="py-2 bg-[#141516] text-white shadow-md rounded-lg cursor-pointer hover:shadow-none">
                    Cadastrar
                </button>
            </form>
        </>
    );

}