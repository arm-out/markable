<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';
	import { Markdown } from 'tiptap-markdown';

	export let content = '';

	let editor: Editor;
	let element: HTMLDivElement;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Markdown.configure({ transformPastedText: true, transformCopiedText: true })
			],
			content: content,
			onUpdate: ({ editor }) => {
				content = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div bind:this={element} class="editor-container" />

<style>
	.editor-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
	}

	:global(.tiptap:focus) {
		outline: none;
	}

	:global(.tiptap) {
		max-width: 105ch;
		width: 100%;
		padding-top: 1.3rem;
	}
</style>
