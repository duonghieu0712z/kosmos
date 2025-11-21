<script setup lang="ts">
import { FileText, Folder, FolderOpen } from 'lucide-vue-next';
import { TreeItem, TreeRoot, TreeVirtualizer } from 'reka-ui';
import { ref } from 'vue';

import { cn } from '@/lib/utils';

const SAMPLES = [
    {
        id: 'characters',
        name: 'Characters',
        children: [
            { id: 'character-1', name: 'Character 1' },
            { id: 'character-2', name: 'Character 2' },
            { id: 'character-3', name: 'Character 3' },
        ],
    },
    {
        id: 'locations',
        name: 'Locations',
        children: [
            { id: 'location-1', name: 'Location 1' },
            { id: 'location-2', name: 'Location 2' },
            { id: 'location-3', name: 'Location 3' },
        ],
    },
    {
        id: 'organizations',
        name: 'Organizations',
        children: [
            { id: 'organization-1', name: 'Organization 1' },
            { id: 'organization-2', name: 'Organization 2' },
            { id: 'organization-3', name: 'Organization 3' },
            {
                id: 'organization-sample',
                name: 'Organization sample with a very long name to test text truncation',
            },
        ],
    },
];

const activeId = ref('');
</script>

<template>
    <TreeRoot class="w-full list-none py-2 select-none" :get-key="(item) => item.id" :items="SAMPLES">
        <TreeVirtualizer v-slot="{ item }" :text-content="(item) => item.name">
            <TreeItem
                :key="item._id"
                v-slot="{ isExpanded }"
                v-bind="item.bind"
                :class="
                    cn(
                        'focus:bg-accent hover:bg-accent/50 flex w-full items-center gap-2 px-2 py-1 text-sm outline-none hover:cursor-pointer',
                        activeId === item._id && 'bg-accent hover:bg-accent'
                    )
                "
                :style="{ 'padding-left': `calc(var(--spacing) * 4 * ${item.level - 0.5})` }"
                @click="activeId = item._id"
            >
                <template v-if="item.hasChildren">
                    <Folder v-if="!isExpanded" :size="16" />
                    <FolderOpen v-else :size="16" />
                </template>
                <FileText v-else :size="16" />
                <div class="flex-1 truncate">{{ item.value.name }}</div>
            </TreeItem>
        </TreeVirtualizer>
    </TreeRoot>
</template>
