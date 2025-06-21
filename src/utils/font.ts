import { invoke } from '@tauri-apps/api/core';

export const DEFAULT_FONT = 'Default';
export const SYSTEM_FONTS: string[] = [DEFAULT_FONT];

export async function loadSystemFonts() {
    const fonts: string[] = await invoke('get_fonts');
    SYSTEM_FONTS.push(...fonts);
}
