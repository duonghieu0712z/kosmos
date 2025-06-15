import { createBrowserRouter } from 'react-router';

import { Dashboard, Story, Temp } from '@/app';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Dashboard,
        children: [
            {
                path: 'story',
                Component: Story,
            },
            {
                path: '*',
                Component: Temp,
            },
        ],
    },
]);
