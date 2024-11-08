import { HorizontalRule } from '@tiptap/extension-horizontal-rule';

export const MarkableHorizontalRule = HorizontalRule.extend({
	addKeyboardShortcuts() {
		return {};
	}
});
