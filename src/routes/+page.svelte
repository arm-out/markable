<script lang="ts">
	import { invoke } from '@tauri-apps/api/core';
	import { onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	let content = $state('');
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

	async function open() {
		invoke('open_file').then((res) => {
			const buffer = new Uint8Array(res as ArrayBuffer);
			console.log(buffer);
			content = String.fromCharCode(...buffer);
		});
	}
</script>

<div style:min-height="100vh">
	<button onclick={open}>Open</button>
	<button>Save As</button>
	<button>Save</button>

	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div bind:this={editorElement} class="editor" />
</div>

<style>
	:global(.tiptap) {
		height: 100vh;
		outline: none;
	}
</style>
