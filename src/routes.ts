import { createMemoryRouter } from 'react-router';

import { Dashboard, Story, Todo } from '@/app';

export const router = createMemoryRouter([
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
                Component: Todo,
            },
        ],
    },
]);
