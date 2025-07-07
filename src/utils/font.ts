import { invoke } from '@tauri-apps/api/core';

export const DEFAULT_FONT = 'Default';
export const SYSTEM_FONTS: string[] = [];

export async function loadSystemFonts() {
    if (SYSTEM_FONTS.length > 0) {
        return;
    }

    const fonts = await invoke<string[]>('get_fonts');
    SYSTEM_FONTS.push(...fonts);
}
