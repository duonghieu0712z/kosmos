import { useEffect } from 'react';

import { Dashboard } from '@/modules/dashboard';
import { loadSystemFonts } from '@/utils';

export default function App() {
    useEffect(() => {
        const controller = new AbortController();
        loadSystemFonts();
        return () => controller.abort();
    }, []);

    return (
        <div
            className='h-screen overflow-hidden'
            onContextMenu={(e) => {
                if (import.meta.env.PROD) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }}
        >
            <Dashboard />
        </div>
    );
}
