import { FormLogin } from "@/app/components/FormLogin";
import { COOKIE } from "@/constants/constants";
import { checkInvalidEmail, checkInvalidPassword } from "@/lib/utils";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const PAGE_TITLE = "Login";

export const metadata: Metadata = {
    title: PAGE_TITLE,
};

export default function Login() {

    const handleLogin = async (_: string, formData: FormData) => {
        "use server";

        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        if (!email || !password) {
            return "Preencha todos os campos";
        }

        if (checkInvalidEmail(email)) {
            return "Email inválido";
        }
        if (checkInvalidPassword(password)) {
            return "A senha precisa ter no mínimo 6 caracteres."
        }

        try {
            const body = {
                email,
                password,
            };

            const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const register = await res.json();
            if (!res.ok) {
                return register.message;
            }
            const cookieStore = await cookies();
            cookieStore.set("token", register.token, COOKIE);
        } catch {
            console.error("handleRegister failed");
            return "Houston, we have a problem! Erro no Cadastro."
        }
        redirect("/tasks");
    }

    return (
        <>
            <h1 className="text-4xl text-center font-bold">{PAGE_TITLE}</h1>
            <FormLogin action={handleLogin} />
            <Link className="text-center underline" href="/register">Não tenho cadastro</Link>
        </>

    );

}