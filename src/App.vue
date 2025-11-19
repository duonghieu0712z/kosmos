<script setup lang="ts">
import { Dashboard } from '@/modules/dashboard';

const IS_PROD = import.meta.env.PROD;
</script>

<template>
    <div
        class="h-screen overflow-hidden"
        @contextmenu="
            (ev) => {
                if (IS_PROD) {
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
        "
    >
        <Dashboard />
    </div>
</template>
