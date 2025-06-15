import { createBrowserRouter } from 'react-router';

import { Dashboard, Temp } from '@/app';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Dashboard,
        children: [
            {
                path: '*',
                Component: Temp,
            },
        ],
    },
]);
