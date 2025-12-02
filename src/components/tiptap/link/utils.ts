import { openUrl } from '@tauri-apps/plugin-opener';
import type { Editor } from '@tiptap/vue-3';
import { Link } from 'lucide-vue-next';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

export interface UseLinkConfig {
    editor: Editor;
}

const LINK_LABEL = 'Link';

function canSetLink(editor: Editor) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.can().setMark('link');
}

function isActiveLink(editor: Editor) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.isActive('link');
}

export function useLink(config: UseLinkConfig) {
    const { editor } = config;
    const url = ref('');
    const canLink = computed(() => canSetLink(editor));
    const isActive = computed(() => isActiveLink(editor));

    const updateLinkState = () => {
        const href = editor.getAttributes('link').href;
        url.value = href;
    };

    onMounted(() => {
        editor.on('selectionUpdate', updateLinkState);
    });

    onBeforeUnmount(() => {
        editor.off('selectionUpdate', updateLinkState);
    });

    const setLink = () => {
        if (!url.value) {
            return;
        }

        const selection = editor.state.selection;
        let chain = editor.chain().focus().extendMarkRange('link').setLink({ href: url.value });
        if (selection.empty) {
            chain = chain.insertContent({ type: 'text', text: url.value });
        }
        chain.run();

        url.value = '';
    };

    const removeLink = () => {
        editor.chain().focus().extendMarkRange('link').unsetLink().setMeta('preventAutolink', true).run();
    };

    const openLink = async () => {
        if (!url.value) {
            return;
        }
        await openUrl(url.value);
    };

    return {
        url,
        canLink,
        isActive,
        label: LINK_LABEL,
        icon: Link,
        setLink,
        removeLink,
        openLink,
    };
}
