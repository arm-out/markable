<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { invoke } from '@tauri-apps/api/core';
	import type { MdFile } from '$lib/types';
	import { createEditor } from './editor';

	let content = $state('');
	let path = $state('');
	let editorElement: HTMLDivElement;
	let editor = $state<Editor>();

	$inspect(editor);
	$inspect(content);
	$inspect(path);

	onMount(() => {
		editor = createEditor(editorElement, content);
		editor.on('transaction', () => {
			editor = editor;
		});
		editor.on('update', ({ editor }) => {
			content = editor.getHTML();
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	async function open() {
		invoke('open_file')
			.then((res) => {
				let file = res as MdFile;
				content = file.content;
				path = file.path;

				if (editor) editor.destroy();
				editor = createEditor(editorElement, content);
				editor.on('transaction', () => {
					editor = editor;
				});
				editor.on('update', ({ editor }) => {
					content = editor.getHTML();
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function save() {
		console.log('saving');
		invoke('save_file', { path, content })
			.then(() => {
				console.log('File saved');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function saveAs() {
		console.log('saving as');
		invoke('save_file_as', { content })
			.then((file_path) => {
				console.log('File saved at ' + file_path);
				path = file_path as string;
			})
			.catch((err) => {
				console.log(err);
			});
	}
</script>

<button onclick={open}>Open</button>
<button onclick={saveAs}>Save As</button>
<button onclick={save}>Save</button>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<div bind:this={editorElement} class="editor" />

<style>
	:global(.tiptap) {
		height: 100vh;
		outline: none;
	}
</style>
