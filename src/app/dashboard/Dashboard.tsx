import { BookA, Eye, Globe2, Home, Hourglass, Map, Menu, PencilRuler, Settings } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/libs';

import SidebarButton from './SidebarButton';

const menus = [
    { name: 'Home', icon: Home },
    { name: 'Story', icon: BookA },
    { name: 'Wiki', icon: PencilRuler },
    { name: 'Map', icon: Map },
    { name: 'Timeline', icon: Hourglass },
    { name: 'World Settings', icon: Globe2 },
    { name: 'View World', icon: Eye },
];

export default function Dashboard() {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className='flex w-full'>
            <aside className={cn('bg-base-200 flex w-60 flex-col p-1', !isExpanded && 'w-[42px]')}>
                <header>
                    <SidebarButton
                        icon={Menu}
                        name=''
                        isExpanded={isExpanded}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                </header>

                <main className='flex-1'>
                    {menus.map((menu) => (
                        <SidebarButton key={menu.name} icon={menu.icon} name={menu.name} isExpanded={isExpanded} />
                    ))}
                </main>

                <footer>
                    <hr className='bg-neutral my-1 h-px border-0'></hr>
                    <SidebarButton icon={Settings} name='Settings' isExpanded={isExpanded} />
                </footer>
            </aside>

            <main className='flex flex-1 items-center justify-center'>Main</main>
        </div>
    );
}
