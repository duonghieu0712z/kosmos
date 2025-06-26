import { RouterProvider } from 'react-router';

import { router } from '@/routes';

export default function MainScreen() {
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
