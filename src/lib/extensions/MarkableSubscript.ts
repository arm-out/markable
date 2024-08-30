import Subscript from '@tiptap/extension-subscript';
import { markInputRule } from '@tiptap/core';
import { markPasteRule } from '@tiptap/core';

const inputRegex = /(?<!~)~([^~\r\n]+)~(?!~)$/;
const pasteRegex = /(?<!~)~([^~\r\n]+)~(?!~)/g;

export const MarkableSubscript = Subscript.extend({
	addInputRules() {
		return [
			markInputRule({
				find: inputRegex,
				type: this.type
			})
		];
	},

	addPasteRules() {
		return [
			markPasteRule({
				find: pasteRegex,
				type: this.type
			})
		];
	}
});
