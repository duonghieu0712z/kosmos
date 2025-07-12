import { CSSProperties } from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import PrimarySidebar from './PrimarySidebar';

export default function Dashboard() {
    return (
        <SidebarProvider
            className='flex flex-col [--footer-height:calc(--spacing(6))]'
            style={{ '--sidebar-width': '300px' } as CSSProperties}
        >
            <main className='flex flex-1'>
                <PrimarySidebar />

                <SidebarInset className='items-center justify-center'>Content</SidebarInset>
            </main>

            <footer className='relative flex h-(--footer-height) items-center border-t px-2 text-xs'>
                <div className='absolute right-2 font-medium'>v{__APP_VERSION__}</div>
            </footer>
        </SidebarProvider>
    );
}
