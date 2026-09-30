"use server";

import { fetchWithToken } from "@/lib/fetchWithToken";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export const handleCreateTask = async (_: string, formData: FormData) => {

    const task = formData.get('task')?.toString();

    if (!task) {
        return "Você precisa informar o título da Task";
    }

    try {
        const body = {
            title: task,
        };

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return "Token não encontrado";
        }

        const res = await fetchWithToken(
            `${process.env.BACKEND_URL}/tasks`,
            token,
            {
                method: 'POST',
                body: JSON.stringify(body),
            });
        const data = await res.json();
        if (!res.ok) {
            return data.message ?? "Erro ao criar Task.";
        }

        updateTag("get-tasks");
        return "";

    } catch {
        console.error("handleCreateTask failed");
        return "Erro ao criar Task.";
    }
};

export const handleCompleteTask = async (formData: FormData) => {

    const id = formData.get('id')?.toString();

    if (!id) {
        console.error("Id da task não informado");
        return;
    }

    try {
        const completed = formData.get("completed");
        const endpoint = completed !== null ? "complete" : "uncomplete";

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            console.error("Token não encontrado");
            return;
        }

        const res = await fetchWithToken(
            `${process.env.BACKEND_URL}/tasks/${id}/${endpoint}`,
            token,
            {
                method: 'PUT',
            });
        const data = await res.json();
        if (!res.ok) {
            console.error(data.message ?? "Erro ao criar Task.");
            return;
        }

        updateTag("get-tasks");

    } catch {
        console.error("handleCompleteTask failed");
        return;
    }
};

export const handleDeleteTask = async (formData: FormData) => {

    const id = formData.get('id')?.toString();

    if (!id) {
        console.error("Id da task não informado");
        return;
    }

    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            console.error("Token não encontrado");
            return;
        }

        const res = await fetchWithToken(
            `${process.env.BACKEND_URL}/tasks/${id}`,
            token,
            {
                method: 'DELETE',
            });
        const data = await res.json();
        if (!res.ok) {
            console.error(data.message ?? "Erro ao deletar a Task.");
            return;
        }

        updateTag("get-tasks");

    } catch {
        console.error("handleDeleteTask failed");
        return;
    }
};
