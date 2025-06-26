import { BookText, Eye, Globe2, Home, Hourglass, Map, PanelLeft, PencilRuler, Settings } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/libs';

import SidebarItem from './SidebarItem';
import SidebarSeparator from './SidebarSeparator';

const menus = [
    { name: 'Home', icon: Home, to: 'home' },
    { name: 'Story', icon: BookText, to: 'story' },
    { name: 'Wiki', icon: PencilRuler, to: 'wiki' },
    { name: 'Map', icon: Map, to: 'map' },
    { name: 'Timeline', icon: Hourglass, to: 'timeline' },
    { name: 'World Settings', icon: Globe2, to: 'world-settings' },
    { name: 'View World', icon: Eye, to: 'view-world' },
];

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true);
    return (
        <aside className={cn('bg-base-200 border-base-300 flex flex-col border-r p-1', isExpanded ? 'w-60' : 'w-10')}>
            <header>
                <button
                    className='btn btn-ghost flex h-[30px] w-full justify-start px-1'
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <PanelLeft size={22} strokeWidth={1.5} />
                </button>
                <SidebarSeparator />
            </header>

            <main className='flex-1'>
                {menus.map((menu) => (
                    <SidebarItem
                        key={menu.name}
                        icon={menu.icon}
                        text={menu.name}
                        isExpanded={isExpanded}
                        to={menu.to}
                    />
                ))}
            </main>

            <footer>
                <SidebarSeparator />
                <SidebarItem icon={Settings} text='Settings' isExpanded={isExpanded} to='/settings' />
            </footer>
        </aside>
    );
}
