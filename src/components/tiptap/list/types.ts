import { List, ListChecks, ListOrdered } from 'lucide-vue-next';

export type ListType = 'bullet' | 'ordered' | 'task';

export const LIST_ICONS = {
    bullet: List,
    ordered: ListOrdered,
    task: ListChecks,
} as const;
