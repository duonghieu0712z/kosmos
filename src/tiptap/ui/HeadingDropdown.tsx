import { ChevronDown, Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide-react';

const HEADING_ICONS = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6];

export default function HeadingDropdown() {
    return (
        <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn m-0 size-fit gap-0 border-none p-1'>
                <Heading size={20} strokeWidth={1.5} />
                <ChevronDown size={12} strokeWidth={1.5} />
            </div>

            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-1 w-33 p-2 shadow-sm'>
                {HEADING_ICONS.map((Icon, i) => (
                    <li>
                        <a>
                            <Icon size={20} strokeWidth={1.5} />
                            Heading {i + 1}
                        </a>
                    </li>
                ))}
                <hr className='bg-neutral my-1 h-px border-0' />
                <li>
                    <a>
                        <div className='size-5'></div>
                        Paragraph
                    </a>
                </li>
            </ul>
        </div>
    );
}
