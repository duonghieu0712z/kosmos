import { BookA, Eye, Globe2, Home, Hourglass, Map, PencilRuler, Settings } from 'lucide-react';
import { useState } from 'react';

import logo from '@/assets/images/logo.png';
import { cn } from '@/libs';

import SidebarItem from './SidebarItem';
import SidebarSeparator from './SidebarSeparator';

const menus = [
    { name: 'Home', icon: Home, to: 'home' },
    { name: 'Story', icon: BookA, to: 'story' },
    { name: 'Wiki', icon: PencilRuler, to: 'wiki' },
    { name: 'Map', icon: Map, to: 'map' },
    { name: 'Timeline', icon: Hourglass, to: 'timeline' },
    { name: 'World Settings', icon: Globe2, to: 'world-settings' },
    { name: 'View World', icon: Eye, to: 'view-world' },
];

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true);
    return (
        <aside className={cn('bg-base-200 flex w-50 flex-col p-1', !isExpanded && 'w-[42px]')}>
            <header>
                <button
                    className={cn(
                        'btn btn-ghost flex w-full justify-start gap-2 px-1 font-medium',
                        !isExpanded && 'tooltip tooltip-right'
                    )}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <img src={logo} alt='logo' className='size-6' />
                    {isExpanded && (
                        <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text font-[calligraphy] text-3xl font-bold text-transparent'>
                            {__APP_NAME__}
                        </div>
                    )}
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
