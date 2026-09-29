import { Metadata } from "next";

const PAGE_TITLE = "Tasks";

export const metadata: Metadata = {
    title: PAGE_TITLE,
};


export default function Tasks() {

    return (
        <div className="grid gap-y-4 min-w-100 px-8 py-12 bg-[#fcfcfc] rounded-3xl shadow-xl">
            <h1 className="text-4xl text-center font-bold">{PAGE_TITLE}</h1>
            
        </div>

    );

}