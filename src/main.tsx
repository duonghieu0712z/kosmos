import '@/styles/globals.css';
import '@/styles/fonts.css';

import { invoke } from '@tauri-apps/api/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import MainScreen from '@/MainScreen';
import { loadSystemFonts } from '@/utils';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MainScreen />
    </StrictMode>
);

async function setup() {
    console.log('Start frontend setup task...');
    await loadSystemFonts();
    console.log('Frontend setup task completed!');

    await invoke('set_complete', { task: 'frontend' });
}

window.addEventListener('DOMContentLoaded', setup);
