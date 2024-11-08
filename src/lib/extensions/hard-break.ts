import { HardBreak } from '@tiptap/extension-hard-break';

export const MarkableHardBreak = HardBreak.extend({
	addKeyboardShortcuts() {
		return {};
	}
});
