import Blockquote from '@tiptap/extension-blockquote';

export const MarkableBlockquote = Blockquote.extend({
	addKeyboardShortcuts() {
		return {};
	}
});
