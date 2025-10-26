import { Menu, MenuItem, PredefinedMenuItem, Submenu } from '@tauri-apps/api/menu';
import { open } from '@tauri-apps/plugin-dialog';
import { platform } from '@tauri-apps/plugin-os';

const isMac = platform() === 'macos';

const separator = await PredefinedMenuItem.new({ item: 'Separator' });

const settingsMenuItem = await MenuItem.new({
    id: 'settings',
    text: 'Settings...',
    accelerator: 'CmdOrCtrl+,',
    action: async () => {
        console.log('settings');
    },
});

const macMenu = await Submenu.new({
    text: __APP_NAME__,
    items: isMac
        ? [
              await PredefinedMenuItem.new({ item: { About: null } }),
              separator,
              settingsMenuItem,
              separator,
              await PredefinedMenuItem.new({ item: 'Hide' }),
              await PredefinedMenuItem.new({ item: 'HideOthers' }),
              await PredefinedMenuItem.new({ item: 'ShowAll' }),
              separator,
              await PredefinedMenuItem.new({ item: 'Quit' }),
          ]
        : [],
});

const fileMenu = await Submenu.new({
    text: 'File',
    items: [
        {
            id: 'new',
            text: 'New Project',
            accelerator: 'CmdOrCtrl+Shift+N',
            action: async () => {
                const path = await open({ directory: true, multiple: false });
                if (path) {
                    console.log('new', path);
                }
            },
        },
        {
            id: 'open',
            text: 'Open Project...',
            accelerator: 'CmdOrCtrl+O',
            action: async () => {
                const path = await open({ directory: true, multiple: false });
                if (path) {
                    console.log('open', path);
                }
            },
        },
        ...(!isMac ? [separator, settingsMenuItem] : []),
        separator,
        await PredefinedMenuItem.new({ item: 'CloseWindow' }),
        await PredefinedMenuItem.new({ item: 'Quit' }),
    ],
});

const editMenu = await Submenu.new({
    text: 'Edit',
    items: [
        await PredefinedMenuItem.new({ item: 'Undo' }),
        await PredefinedMenuItem.new({ item: 'Redo' }),
        separator,
        await PredefinedMenuItem.new({ item: 'Cut' }),
        await PredefinedMenuItem.new({ item: 'Copy' }),
        await PredefinedMenuItem.new({ item: 'Paste' }),
        await PredefinedMenuItem.new({ item: 'SelectAll' }),
    ],
});

const windowMenu = await Submenu.new({
    text: 'Window',
    items: [
        await PredefinedMenuItem.new({ item: 'Minimize' }),
        await PredefinedMenuItem.new({ item: 'Maximize' }),
        await PredefinedMenuItem.new({ item: 'Fullscreen' }),
    ],
});

const helpMenu = await Submenu.new({
    text: 'Help',
    items: [
        {
            id: 'update',
            text: 'Check for Updates...',
            action: async () => console.log('check for updates'),
        },
        ...(!isMac ? [separator, await PredefinedMenuItem.new({ item: { About: null } })] : []),
    ],
});

const menu = await Menu.new({
    items: [...(isMac ? [macMenu] : []), fileMenu, editMenu, windowMenu, helpMenu],
});

await menu.setAsAppMenu();
