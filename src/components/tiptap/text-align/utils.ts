import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-vue-next';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export const ALIGN_ICONS = {
    left: AlignLeft,
    center: AlignCenter,
    right: AlignRight,
    justify: AlignJustify,
} as const;
