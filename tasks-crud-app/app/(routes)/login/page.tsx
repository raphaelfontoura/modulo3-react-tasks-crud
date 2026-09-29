import { FormLogin } from "@/app/components/FormLogin";
import { Metadata } from "next";
import { cookies } from "next/headers";
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

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return "Email inválido";
        }
        if (password.length < 6) {
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
            cookieStore.set("token", register.token, {
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24,
            })
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
        </>

    );

}