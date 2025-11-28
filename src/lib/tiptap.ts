import type { Node } from '@tiptap/pm/model';
import type { Editor } from '@tiptap/vue-3';
import { isNodeSelection } from '@tiptap/vue-3';

export function isMarkInSchema(editor: Editor, markName: string) {
    if (!editor.schema) {
        return false;
    }
    return editor.schema.spec.marks.get(markName) !== undefined;
}

export function isNodeInSchema(editor: Editor, nodeName: string) {
    if (!editor.schema) {
        return false;
    }
    return editor.schema.spec.nodes.get(nodeName) !== undefined;
}

export function isNodeTypeSelected(editor: Editor, types: string[] = []) {
    if (!editor.state.selection) {
        return false;
    }

    const { selection } = editor.state;
    if (selection.empty) {
        return false;
    }

    if (isNodeSelection(selection)) {
        const node = selection.node;
        return node ? types.includes(node.type.name) : false;
    }

    return false;
}

export function isValidPosition(pos?: number): pos is number {
    return typeof pos === 'number' && pos >= 0;
}

export function findNodeAtPosition(editor: Editor, pos: number) {
    try {
        const node = editor.state.doc.nodeAt(pos);
        if (!node) {
            console.warn(`No node found at position ${pos}`);
            return null;
        }
        return node;
    } catch (error) {
        console.error(`Error finding node at position ${pos}:`, error);
        return null;
    }
}

export function findNodePosition(editor: Editor, props: { node?: Node; pos?: number }) {
    if (!editor.state.doc) {
        return null;
    }

    const { node, pos } = props;
    if (!node && !isValidPosition(pos)) {
        return null;
    }

    if (node) {
        let foundPos = -1;
        let foundNode: Node = null!;

        editor.state.doc.descendants((currentNode, pos) => {
            if (currentNode === node) {
                foundPos = pos;
                foundNode = currentNode;
                return false;
            }
            return true;
        });

        if (foundNode && foundPos !== -1) {
            return { node: foundNode, pos: foundPos };
        }
    }

    if (isValidPosition(pos)) {
        const nodeAtPos = findNodeAtPosition(editor, pos);
        if (nodeAtPos) {
            return { node: nodeAtPos, pos };
        }
    }

    return null;
}
