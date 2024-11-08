import { Editor } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import { MarkableHeading, MarkableParagraph } from './extensions';

export function createEditor(el: HTMLElement, content: string) {
	return new Editor({
		element: el,
		extensions: [Document, Text, MarkableHeading, MarkableParagraph],
		content,
		autofocus: true
	});
}
