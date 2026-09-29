import { Metadata } from "next";

const PAGE_TITLE = "Login";

export const metadata: Metadata = {
    title: PAGE_TITLE,
};

export default function Login() {

    return (
        <div className="grid gap-y-4 min-w-100 px-8 py-12 bg-[#fcfcfc] rounded-3xl shadow-xl">
            <h1 className="text-4xl text-center font-bold">{PAGE_TITLE}</h1>
            
        </div>

    );

}