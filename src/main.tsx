import '@/styles/globals.css';
import '@/styles/fonts.css';

import { invoke } from '@tauri-apps/api/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import MainScreen from '@/MainScreen';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MainScreen />
    </StrictMode>
);

async function setup() {
    console.log('Start frontend setup task...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Frontend setup task completed!');

    await invoke('set_complete', { task: 'frontend' });
}

window.addEventListener('DOMContentLoaded', setup);
