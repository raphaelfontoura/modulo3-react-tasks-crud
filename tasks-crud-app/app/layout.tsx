import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Tasks App",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="pt-BR"
            data-theme="light"
        >
            <body className="min-h-full flex flex-col antialiased">
                <header className="fixed top-0 right-0 left-0 py-2 border-b text-center shadow-xl">
                    <Link className="font-bold" href="/">Tasks App</Link>
                </header>
                <main className="mt-18 mb-14 flex justify-center">
                    {children}
                </main>
                <footer className="text-center">
                    <p className="text-sm">Projeto desenvolvido durante o curso de Fundamentos de Front-end com React</p>
                    <p className="text-xs">{2026}</p>
                </footer>
            </body>
        </html>
    );
}
