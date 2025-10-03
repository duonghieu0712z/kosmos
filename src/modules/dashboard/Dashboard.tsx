import { CSSProperties } from 'react';

import { SidebarProvider } from '@/components/ui/sidebar';
import { TabProvider } from '@/components/ui/tab-provider';

import MainContent from './MainContent';
import PrimarySidebar from './PrimarySidebar';

export default function Dashboard() {
    return (
        <SidebarProvider className='flex flex-col' style={{ '--sidebar-width': '300px' } as CSSProperties}>
            <TabProvider>
                <main className='flex flex-1'>
                    <PrimarySidebar />
                    <MainContent />
                </main>
            </TabProvider>
        </SidebarProvider>
    );
}
