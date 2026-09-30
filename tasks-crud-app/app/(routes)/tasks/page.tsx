import { FormTasks } from "@/app/components/forms/FormTasks";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { handleCompleteTask, handleCreateTask, handleDeleteTask } from "./actions";
import { TaskCard } from "@/app/components/TaskCard";

const PAGE_TITLE = "Tasks";

export const metadata: Metadata = {
    title: PAGE_TITLE,
};

type TaskType = {
    _id: string,
    userId: string;
    title: string;
    completed: boolean;
    deleted: boolean;
    createDate: string;
    modifyDate: string;
};

export default async function Tasks() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    const res = await fetchWithToken(
        `${process.env.BACKEND_URL}/tasks`,
        token,
        {
            cache: "force-cache",
            next: {
                tags: ["get-tasks"],
            },
        }
    );
    const { tasks }: { tasks: TaskType[] } = await res.json();

    return (
        <>
            <h1 className="text-4xl text-center font-bold">{PAGE_TITLE}</h1>
            <FormTasks action={handleCreateTask} />

            <ul className="grid gap-y-3">
                {tasks.reverse()
                    .sort((a, b) => !a.completed && b.completed ? -1 : 0)
                    .map((task) => (
                        <TaskCard
                            key={task._id}
                            taskId={task._id}
                            completed={task.completed}
                            completeAction={handleCompleteTask}
                            deleteAction={handleDeleteTask}
                        >
                            {task.title}
                        </TaskCard>
                    ))}
            </ul>
        </>

    );

}