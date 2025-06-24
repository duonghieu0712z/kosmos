import { TableOfContentData } from '@tiptap/extension-table-of-contents';
import { ReactNode, useState } from 'react';

import { ToCContext } from '@/tiptap/hooks';

export default function ToCProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<TableOfContentData>([]);
    return <ToCContext.Provider value={{ data, setData }}>{children}</ToCContext.Provider>;
}
