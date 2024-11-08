import { Editor } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Dropcursor from '@tiptap/extension-dropcursor';
import {
	MarkableBlockquote,
	MarkableBulletList,
	MarkableCodeBlock,
	MarkableHardBreak,
	MarkableHeading,
	MarkableHorizontalRule,
	MarkableOrderedList,
	MarkableParagraph
} from './extensions';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import Gapcursor from '@tiptap/extension-gapcursor';

export function createEditor(el: HTMLElement, content: string) {
	return new Editor({
		element: el,
		extensions: [
			Document,
			Text,
			MarkableHeading,
			MarkableParagraph,
			MarkableBlockquote,
			MarkableBulletList,
			MarkableCodeBlock,
			MarkableHardBreak,
			MarkableHorizontalRule,
			MarkableOrderedList,
			Bold,
			Italic,
			Strike,
			Code,
			Dropcursor,
			Gapcursor
		],
		content,
		autofocus: true
	});
}
