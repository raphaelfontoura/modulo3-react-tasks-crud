"use client";

import { FC, PropsWithChildren } from "react";

interface TaskCardProps extends PropsWithChildren {
    taskId: string;
    completed: boolean;
    completeAction: (formData: FormData) => Promise<void>;
};

export const TaskCard: FC<TaskCardProps> = ({ taskId, completed, completeAction, children }) => (

    <li className="p-4 text-[#7b7b7b] border border-[#e8e9e9] rounded-lg hover:border-[#b2b2b2]">
        <form action={completeAction}>
            <input name="id" type="hidden" value={taskId} />
            <input
                className="accent-[#141516]"
                name="completed"
                type="checkbox"
                defaultChecked={completed}
                onChange={(e) => e.target.form!.requestSubmit()}
            />
        </form>
        {children}
    </li>

);
