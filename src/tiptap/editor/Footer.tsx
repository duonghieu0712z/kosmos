import { useCurrentEditor } from '@tiptap/react';

type FooterProps = { limit: number };

export default function Footer({ limit }: FooterProps) {
    const { editor } = useCurrentEditor();
    const characters = editor?.storage.characterCount.characters() ?? 0;
    const words = editor?.storage.characterCount.words() ?? 0;
    const percentage = Math.round((characters * 100) / limit);

    return (
        <div className='bg-base-200 flex w-full items-center gap-2 p-2'>
            <div className='relative size-15'>
                <svg className='size-full -rotate-90' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
                    <circle
                        cx='18'
                        cy='18'
                        r='16'
                        fill='none'
                        className='text-neutral-content stroke-current'
                        strokeWidth='2'
                    ></circle>
                    <circle
                        cx='18'
                        cy='18'
                        r='16'
                        fill='none'
                        className='text-primary stroke-current'
                        strokeWidth='2'
                        stroke-dasharray='100'
                        stroke-dashoffset={100 - percentage}
                        strokeLinecap='round'
                    ></circle>
                </svg>
                <div className='absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
                    <div className='text-primary text-center font-bold'>{percentage}%</div>
                </div>
            </div>
            {characters} / {limit} characters
            <br />
            {words} words
        </div>
    );
}
