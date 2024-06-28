/**
 * v0 by Vercel.
 * @see https://v0.dev/t/znMNf0cjDWv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";
import React from "react";
import AppTopBar from "@/layout/AppTopBar";

export default function NotFound() {
    return (
        <div className='flex flex-col min-h-[100vh]'>
            <main className='flex-1 flex flex-col items-center justify-center gap-4'>
                <div className='flex flex-col items-center justify-center space-y-2 text-center'>
                    <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                        Erreur 404
                    </div>
                    <h1 className='text-4xl font-extrabold tracking-tighter sm:text-6xl'>Page Not Found</h1>
                    <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400'>
                        Désole, la page que vous cherchez n'existe pas. Veuillez vérifier l'URL dans la barre d'adresse
                        et réessayer.
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
    );
}

function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
        </svg>
    );
}
