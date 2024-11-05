<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	let { content = '' } = $props();
	let editorElement: HTMLDivElement;
	let editor: Editor;

	$effect(() => {
		if (editor) {
			editor.destroy();
		}

		editor = new Editor({
			element: editorElement,
			extensions: [StarterKit],
			content,
			autofocus: true,
			onTransaction: () => {
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	$inspect(content);
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<div bind:this={editorElement} class="editor" />

<style>
	:global(.tiptap) {
		height: 100vh;
		outline: none;
	}
</style>
