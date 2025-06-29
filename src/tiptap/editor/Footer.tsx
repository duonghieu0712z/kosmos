import { useCurrentEditor } from '@tiptap/react';

import { Progress } from '@/components/ui/progress';

type FooterProps = { limit: number };

export default function Footer({ limit }: FooterProps) {
    const { editor } = useCurrentEditor();
    const characters = editor?.storage.characterCount.characters() ?? 0;
    const words = editor?.storage.characterCount.words() ?? 0;
    const percentage = Math.round((characters * 100) / limit);

    return (
        <div className='bg-base-200 border-base-300 flex w-full items-center gap-2 border-t p-2 text-sm'>
            <Progress value={percentage} className='w-40' />
            {characters} / {limit} characters, {words} words
        </div>
    );
}
