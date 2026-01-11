<script setup lang="ts">
import { FileText, Folder, FolderOpen } from 'lucide-vue-next';
import { TreeItem, TreeRoot, TreeVirtualizer } from 'reka-ui';
import { markRaw, ref, shallowRef } from 'vue';

import { cn } from '@/lib/utils';
import Editor from '@/modules/tiptap/Editor.vue';
import { useProjectStore, useTabsStore } from '@/stores';

const currentItem = ref('');

const projectStore = useProjectStore();
const tabsStore = useTabsStore();
</script>

<template>
    <TreeRoot class="w-full list-none py-2 select-none" :get-key="(item) => item.id" :items="projectStore.books">
        <TreeVirtualizer v-slot="{ item }" :text-content="(item) => item.title">
            <TreeItem
                :key="item._id"
                v-slot="{ isExpanded }"
                v-bind="item.bind"
                :class="
                    cn(
                        'focus:bg-accent hover:bg-accent/50 flex w-full items-center gap-2 px-2 py-1 text-sm outline-none hover:cursor-pointer',
                        currentItem === item._id && 'bg-accent hover:bg-accent',
                    )
                "
                :style="{ 'padding-left': `calc(var(--spacing) * 4 * ${item.level - 0.5})` }"
                @click="
                    async () => {
                        currentItem = item._id;
                        if (!item.hasChildren) {
                            const tab = {
                                id: item._id,
                                name: item.value.title,
                                component: shallowRef(markRaw(Editor)),
                            };
                            await tabsStore.pushTab(tab);
                        }
                    }
                "
            >
                <template v-if="item.hasChildren">
                    <Folder v-if="!isExpanded" :size="16" />
                    <FolderOpen v-else :size="16" />
                </template>
                <FileText v-else :size="16" />
                <div class="flex-1 truncate">{{ item.value.title }}</div>
            </TreeItem>
        </TreeVirtualizer>
    </TreeRoot>
</template>
