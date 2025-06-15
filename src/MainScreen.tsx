import { RouterProvider } from 'react-router';

import { router } from '@/routes';

export default function MainScreen() {
    return (
        <div
            className='flex min-h-screen flex-col overflow-hidden'
            onContextMenu={(e) => {
                if (import.meta.env.PROD) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }}
        >
            {/* <header className='bg-base-300 flex h-8 items-center px-2'>Header</header> */}

            <main className='flex flex-1'>
                <RouterProvider router={router} />
            </main>

            <footer className='bg-base-300 relative flex h-6 items-center px-2 text-xs'>
                <div>
                    <div className='inline-grid *:[grid-area:1/1]'>
                        <div className='status status-primary animate-ping'></div>
                        <div className='status status-primary'></div>
                    </div>{' '}
                    status
                </div>
                <div className='absolute right-2 font-medium'>v{__APP_VERSION__}</div>
            </footer>
        </div>
    );
}
