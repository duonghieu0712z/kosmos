<script setup lang="ts">
import { ref } from 'vue';

import { commands } from './bindings';

const greetMsg = ref('');
const name = ref('');

async function greet() {
    greetMsg.value = await commands.greet(name.value);
}
</script>

<template>
    <main class="font-ui selection:bg-primary/20 flex flex-col items-center justify-center pt-[10vh] text-center">
        <h1 class="text-foreground mb-10 text-4xl font-bold tracking-tight">Welcome to Kosmos</h1>

        <div class="flex justify-center gap-3">
            <input
                id="greet-input"
                v-model="name"
                class="border-border bg-input/20 focus:border-primary focus:ring-primary/20 dark:bg-input/10 placeholder:text-muted-foreground rounded-lg border px-5 py-2.5 text-base font-medium transition-all outline-none focus:ring-2"
                placeholder="Enter a name..."
            />
            <button
                class="bg-primary text-primary-foreground cursor-pointer rounded-lg px-6 py-2.5 text-base font-semibold shadow-md transition-all hover:opacity-90 active:scale-95"
                type="button"
                @click="greet"
            >
                Greet
            </button>
        </div>

        <p
            v-if="greetMsg"
            class="text-muted-foreground animate-in fade-in slide-in-from-top-2 mt-8 text-lg font-medium duration-500"
        >
            {{ greetMsg }}
        </p>
    </main>
</template>

<style></style>
