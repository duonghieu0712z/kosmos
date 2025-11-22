<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarInset } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Todo } from '@/modules/todo';

const nbTabs = 10;
</script>

<template>
    <SidebarInset class="min-w-0 items-center justify-center">
        <Tabs class="size-full gap-0" default-value="todo-1">
            <ScrollArea v-wheel-x orientation="horizontal">
                <TabsList class="h-6 w-full justify-start rounded-none p-0">
                    <TabsTrigger
                        v-for="i in nbTabs"
                        :key="i"
                        class="data-active:before:border-ring relative w-40 flex-none rounded-none text-xs data-active:before:absolute data-active:before:bottom-0 data-active:before:left-0 data-active:before:w-full data-active:before:border-b-2"
                        :value="`todo-${i}`"
                    >
                        Todo {{ i }}
                    </TabsTrigger>
                </TabsList>
            </ScrollArea>

            <TabsContent v-for="i in nbTabs" :key="i" as-child :value="`todo-${i}`">
                <Todo />
            </TabsContent>
        </Tabs>
    </SidebarInset>
</template>
