import { Editor } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { MarkableHeading } from './extensions';

export function createEditor(el: HTMLElement, content: string) {
	return new Editor({
		element: el,
		extensions: [Document, Text, MarkableHeading, Paragraph],
		content,
		autofocus: true
	});
}
