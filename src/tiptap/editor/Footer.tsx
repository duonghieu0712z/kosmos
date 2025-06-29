import { useCurrentEditor } from '@tiptap/react';

import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

type FooterProps = { limit: number };

export default function Footer({ limit }: FooterProps) {
    const { editor } = useCurrentEditor();
    const characters = editor?.storage.characterCount.characters() ?? 0;
    const words = editor?.storage.characterCount.words() ?? 0;
    const percentage = Math.round((characters * 100) / limit);

    return (
        <>
            <Separator />
            <div className='flex w-full items-center gap-2 px-2 py-1 text-xs'>
                <Progress value={percentage} className='w-40' />
                {characters} / {limit} character(s), {words} word(s)
            </div>
        </>
    );
}
