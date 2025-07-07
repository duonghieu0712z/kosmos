import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

import { router } from '@/routes';
import { loadSystemFonts } from '@/utils';

export default function App() {
    useEffect(() => {
        const controller = new AbortController();
        loadSystemFonts();
        return () => controller.abort();
    }, []);

    return (
        <div
            className='flex h-screen flex-col overflow-hidden'
            onContextMenu={(e) => {
                if (import.meta.env.PROD) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }}
        >
            <main className='flex flex-1 overflow-hidden'>
                <RouterProvider router={router} />
            </main>
        </div>
    );
}
