import { TableOfContentData, TableOfContentDataItem } from '@tiptap/extension-table-of-contents';

import { cn } from '@/lib/utils';
import { useToC } from '@/tiptap/hooks';

type ToCItem = TableOfContentDataItem & { children: ToCItem[] };

function buildToCTree(data: TableOfContentData) {
    const tree: ToCItem[] = [];
    const stack: ToCItem[] = [];

    data.forEach((node) => {
        const item: ToCItem = { ...node, children: [] };

        while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
            stack.pop();
        }

        if (stack.length === 0) {
            tree.push(item);
        } else {
            const parent = stack[stack.length - 1];
            parent.children.push(item);
        }
        stack.push(item);
    });

    return tree;
}

function ToCItem({ item }: { item: ToCItem }) {
    const hasChildren = item.children && item.children.length > 0;

    return (
        <>
            <a className={cn('link link-hover', hasChildren && 'menu-dropdown-toggle menu-dropdown-show')}>
                {item.textContent}
            </a>
            {hasChildren && <ToCTree tree={item.children} />}
        </>
    );
}

function ToCTree({ tree }: { tree: ToCItem[] }) {
    return (
        <ul className='menu-dropdown menu-dropdown-show'>
            {tree.map((item, index) => (
                <li key={index}>
                    <ToCItem item={item} />
                </li>
            ))}
        </ul>
    );
}

export default function ToC() {
    const { data } = useToC();
    const tree = buildToCTree(data);

    return <div>Table of Contents</div>;

    return (
        <div className='menu w-full'>
            <ToCTree tree={tree} />
        </div>
    );
}
