import { Menu, PredefinedMenuItem, Submenu } from '@tauri-apps/api/menu';
import { open } from '@tauri-apps/plugin-dialog';

const separator = await PredefinedMenuItem.new({
    item: 'Separator',
});

const fileMenu = await Submenu.new({
    text: 'File',
    items: [
        {
            id: 'new',
            text: 'New',
            accelerator: 'CmdOrCtrl+N',
            action: () => console.log('new'),
        },
        {
            id: 'open',
            text: 'Open',
            accelerator: 'CmdOrCtrl+O',
            action: async () => {
                const path = await open({
                    directory: true,
                    multiple: false,
                });
                if (path) {
                    console.log(path);
                }
            },
        },
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
        await PredefinedMenuItem.new({ item: 'Copy' }),
        await PredefinedMenuItem.new({ item: 'Cut' }),
        await PredefinedMenuItem.new({ item: 'Paste' }),
    ],
});

const menu = await Menu.new({
    items: [fileMenu, editMenu],
});

await menu.setAsAppMenu();
