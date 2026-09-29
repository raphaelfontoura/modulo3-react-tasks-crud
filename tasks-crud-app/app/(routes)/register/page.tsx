import Link from "next/link";
import { FormRegister } from "../../components/FormRegister";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { checkInvalidEmail, checkInvalidPassword } from "@/lib/utils";
import { COOKIE } from "@/constants/constants";

const PAGE_TITLE = "Cadastro";

export const metadata: Metadata = {
    title: PAGE_TITLE,
};

export default function Cadastro() {

    const handleRegister = async (_: string, formData: FormData) => {
        "use server";

        const username = formData.get('username')?.toString();
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        if (!username || !email || !password) {
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
                username,
                email,
                password,
            };

            const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
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
            <FormRegister action={handleRegister} />
            <Link className="text-center underline" href="/login">Já tenho cadastro</Link>
        </>
    );

}