import { TableOfContentData } from '@tiptap/extension-table-of-contents';
import { createContext, useContext } from 'react';

export const ToCContext = createContext<{
    data: TableOfContentData;
    setData: (data: TableOfContentData) => void;
}>(null!);

export function useToC() {
    return useContext(ToCContext);
}
