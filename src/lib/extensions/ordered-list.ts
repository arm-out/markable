import { OrderedList } from '@tiptap/extension-ordered-list';

export const MarkableOrderedList = OrderedList.extend({
	addKeyboardShortcuts() {
		return {};
	}
});
