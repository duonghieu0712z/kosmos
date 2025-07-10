import { Outlet } from 'react-router';

import { SidebarProvider } from '@/components/ui/sidebar';

import AppSidebar from './AppSidebar';

export default function Dashboard() {
    return (
        <SidebarProvider className='flex w-full'>
            <AppSidebar />
            <main className='flex flex-1 items-center justify-center'>
                <Outlet />
            </main>
        </SidebarProvider>
    );
}
