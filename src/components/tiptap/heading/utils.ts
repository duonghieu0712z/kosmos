import { Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide-vue-next';

export type HeadingLevels = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const HEADING_ICONS = [Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6] as const;
