import BulletList from '@tiptap/extension-bullet-list';

export const MarkableBulletList = BulletList.extend({
	addKeyboardShortcuts() {
		return {};
	}
});
