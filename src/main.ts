import '@/styles/globals.css';

import { createApp } from 'vue';

import App from '@/App.vue';
import { vWheelX } from '@/components/ui/scroll-area';

createApp(App).directive('wheel-x', vWheelX).mount('#app');
