<template>
    <div
        class="data-[active=true]:[&>svg]:stroke-sidebar-foreground hover:[&>svg]:stroke-sidebar-foreground hover:bg-sidebar data-[active=true]:before:border-sidebar-foreground flex h-12 items-center justify-center rounded-none group-data-[collapsible=icon]:size-12! hover:cursor-pointer data-[active=true]:before:absolute data-[active=true]:before:top-0 data-[active=true]:before:left-0 data-[active=true]:before:h-full data-[active=true]:before:border-l-2"
    >
        <button
            class="data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 inline-flex h-[calc(100%-1px)] w-40 flex-1 items-center justify-center gap-1.5 rounded-none border-0 border-transparent px-2 py-1 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm"
            data-slot="tabs-trigger"
        >
            Todo
        </button>
    </div>
</template>
