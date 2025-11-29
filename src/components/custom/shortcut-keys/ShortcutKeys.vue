<script setup lang="ts">
import { Kbd, KbdGroup } from '@/components/ui/kbd';

defineProps<{ shortcutKeys: string[] }>();
</script>

<template>
    <KbdGroup>
        <Kbd v-for="key in shortcutKeys" :key="key">{{ key }}</Kbd>
    </KbdGroup>
</template>
