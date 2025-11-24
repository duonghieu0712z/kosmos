import { Bold, Code2, Italic, Strikethrough, Subscript, Superscript, Underline } from 'lucide-vue-next';

export type MarkType = 'bold' | 'italic' | 'strike' | 'underline' | 'code' | 'superscript' | 'subscript';

export const MARK_ICONS = {
    bold: Bold,
    italic: Italic,
    strike: Strikethrough,
    underline: Underline,
    code: Code2,
    superscript: Superscript,
    subscript: Subscript,
};
