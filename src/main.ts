import '@/styles/globals.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '@/App.vue';
import { vWheelX } from '@/components/ui/scroll-area';

createApp(App).use(createPinia()).directive('wheel-x', vWheelX).mount('#app');
