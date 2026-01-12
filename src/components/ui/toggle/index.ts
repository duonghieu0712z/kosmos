import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ToggleProps as _ToggleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

export { default as Toggle } from './Toggle.vue';

export const toggleVariants = cva(
    [
        'inline-flex items-center justify-center rounded-sm text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none',
        'hover:bg-muted hover:text-muted-foreground',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1.5px]',
        'disabled:pointer-events-none disabled:opacity-50',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    ],
    {
        variants: {
            variant: {
                default: 'bg-transparent',
                outline: 'border-input hover:bg-accent hover:text-accent-foreground border bg-transparent shadow-xs',
            },
            size: {
                default: 'h-8 gap-2 px-2',
                icon: 'size-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export type ToggleVariants = VariantProps<typeof toggleVariants>;

export interface ToggleProps extends _ToggleProps {
    variant?: ToggleVariants['variant'];
    size?: ToggleVariants['size'];
    class?: HTMLAttributes['class'];
}
