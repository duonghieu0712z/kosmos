import { useCurrentEditor, useEditorState } from '@tiptap/react';

export function useTiptapEditor<T>(options: Omit<Parameters<typeof useEditorState<T>>[0], 'editor'>) {
    const { editor } = useCurrentEditor();
    const editorState = useEditorState({ editor, ...options });
    return { editor, editorState };
}
