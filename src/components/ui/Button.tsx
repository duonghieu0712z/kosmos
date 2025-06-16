import { forwardRef, useMemo } from 'react';
import { ButtonHTMLAttributes, Fragment, ReactNode } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

type PlatformShortcuts = Record<string, string>;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    showTooltip?: boolean;
    tooltip?: ReactNode;
    shortcutKeys?: string;
}

export const MAC_SYMBOLS: PlatformShortcuts = {
    ctrl: '⌘',
    alt: '⌥',
    shift: '⇧',
} as const;

export const formatShortcutKey = (key: string, isMac: boolean) => {
    if (isMac) {
        const lowerKey = key.toLowerCase();
        return MAC_SYMBOLS[lowerKey] || key.toUpperCase();
    }
    return key.charAt(0).toUpperCase() + key.slice(1);
};

export const parseShortcutKeys = (shortcutKeys: string | undefined, isMac: boolean) => {
    if (!shortcutKeys) return [];

    return shortcutKeys
        .split('-')
        .map((key) => key.trim())
        .map((key) => formatShortcutKey(key, isMac));
};

export function ShortcutDisplay({ shortcuts }: { shortcuts: string[] }) {
    if (shortcuts.length === 0) return null;

    return (
        <div>
            {shortcuts.map((key, index) => (
                <Fragment key={index}>
                    {index > 0 && <kbd>+</kbd>}
                    <kbd>{key}</kbd>
                </Fragment>
            ))}
        </div>
    );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className = '', children, tooltip, showTooltip = true, shortcutKeys, 'aria-label': ariaLabel, ...props },
        ref
    ) => {
        const isMac = useMemo(
            () => typeof navigator !== 'undefined' && navigator.platform.toLowerCase().includes('mac'),
            []
        );

        const shortcuts = useMemo(() => parseShortcutKeys(shortcutKeys, isMac), [shortcutKeys, isMac]);

        if (!tooltip || !showTooltip) {
            return (
                <button className={`tiptap-button ${className}`.trim()} ref={ref} aria-label={ariaLabel} {...props}>
                    {children}
                </button>
            );
        }

        return (
            <Tooltip delay={200}>
                <TooltipTrigger
                    className={`tiptap-button ${className}`.trim()}
                    ref={ref}
                    aria-label={ariaLabel}
                    {...props}
                >
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    {tooltip}
                    <ShortcutDisplay shortcuts={shortcuts} />
                </TooltipContent>
            </Tooltip>
        );
    }
);

Button.displayName = 'Button';
