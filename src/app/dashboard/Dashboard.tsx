import { Outlet } from 'react-router';

import Sidebar from './Sidebar';

export default function Dashboard() {
    return (
        <div className='flex w-full'>
            <Sidebar />
            <main className='flex flex-1 items-center justify-center'>
                <Outlet />
            </main>
        </div>
    );
}
