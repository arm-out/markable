import { Editor } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';

export function createEditor(el: HTMLElement, content: string) {
	return new Editor({
		element: el,
		extensions: [Document, Heading, Paragraph],
		content,
		autofocus: true
	});
}
