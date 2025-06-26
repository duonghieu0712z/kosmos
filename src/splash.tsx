import '@/styles/globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import SplashScreen from '@/SplashScreen';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SplashScreen />
    </StrictMode>
);
