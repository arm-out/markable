import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

export function createEditor(el: HTMLElement, content: string) {
	return new Editor({
		element: el,
		extensions: [StarterKit],
		content,
		autofocus: true
	});
}
