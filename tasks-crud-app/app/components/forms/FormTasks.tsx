"use client";

import { useActionState, useEffect, useState } from "react";

import { FormError } from "../FormError";

type FormTasksProps = {
    action: (previousState: string, formData: FormData) => Promise<string> | string;
};

export const FormTasks = ({ action }: FormTasksProps) => {

    const [task, setTask] = useState("");

    const [errorMessage, formAction, isPending] = useActionState(action, "");

    useEffect(() => {
        if (!isPending && !errorMessage) {
            setTask("");
        }
    }, [isPending, errorMessage]);

    return (
        <>
            {!isPending &&
                <FormError errorMessage={errorMessage} />
            }
            <form className="relative shadow-lg rounded-lg" action={formAction}>
                <input
                    className="w-full px-2 py-1 pr-10 text-[#7b7c7b] border border-[#d9d9d9] focus:border-[#b2b2b2] hover:border-[#b2b2b2] outline-none rounded-l-lg"
                    name="task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Informe o título da task"
                />
                <button
                    className="absolute top-0 right-0 bottom-0 px-3 bg-[#141516] text-white rounded-r-lg cursor-pointer"
                >
                    +
                </button>


            </form>
        </>
    );

}