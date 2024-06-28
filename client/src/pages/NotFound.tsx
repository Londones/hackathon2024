/**
 * v0 by Vercel.
 * @see https://v0.dev/t/znMNf0cjDWv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";
import React from "react";
import AppTopBar from "@/layout/AppTopBar";
import { LayoutContext } from "@/layout/Layout";

export default function NotFound() {
    const isInLayout = React.useContext(LayoutContext);
    return (
        <div className={`flex flex-col h-screen ${isInLayout ? "space-y-0" : "space-y-4"}`}>
            {isInLayout || <AppTopBar />}
            <div className='flex flex-col flex-grow'>
                <main className='flex-1 flex flex-col items-center justify-center gap-4'>
                    <div className='flex flex-col items-center justify-center space-y-2 text-center'>
                        <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                            Erreur 404
                        </div>
                        <h1 className='text-4xl font-extrabold tracking-tighter sm:text-6xl'>Page non trouvée</h1>
                        <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400'>
                            Désole, la page que vous cherchez n'existe pas. Veuillez vérifier l'URL dans la barre
                            d'adresse et réessayer.
                        </p>
                    </div>
                    <Link
                        to='/'
                        className='inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                    >
                        Retour à l'accueil
                    </Link>
                </main>
            </div>
        </div>
    );
}
