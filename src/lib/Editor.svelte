<script lang="ts">
	import { Editor } from '@tiptap/core';

	import Document from '@tiptap/extension-document';
	import Paragraph from '@tiptap/extension-paragraph';
	import Text from '@tiptap/extension-text';
	import Heading from '@tiptap/extension-heading';
	import HorizontalRule from '@tiptap/extension-horizontal-rule';
	import Typography from '@tiptap/extension-typography';
	import { MarkableBold } from './extensions/MarkableBold';
	import { MarkableItalic } from './extensions/MarkableItalic';
	import { MarkableStrike } from './extensions/MarkableStrike';
	import Blockquote from '@tiptap/extension-blockquote';
	import ListItem from '@tiptap/extension-list-item';
	import BulletList from '@tiptap/extension-bullet-list';
	import OrderedList from '@tiptap/extension-ordered-list';
	import Code from '@tiptap/extension-code';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import { MarkableSubscript } from './extensions/MarkableSubscript';
	import { MarkableSuperscript } from './extensions/MarkableSuperscript';
	import Dropcursor from '@tiptap/extension-dropcursor';
	import Gapcursor from '@tiptap/extension-gapcursor';
	import TextStyle from '@tiptap/extension-text-style';

	import { onDestroy, onMount } from 'svelte';

	export let content = '';
	export let lowlight;

	let editor: Editor;
	let element: HTMLDivElement;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Document,
				Paragraph,
				Text,
				Heading,
				HorizontalRule,
				Typography,
				MarkableBold,
				MarkableItalic,
				MarkableStrike,
				Blockquote,
				ListItem,
				BulletList,
				OrderedList,
				Code,
				CodeBlockLowlight.configure({ lowlight }),
				TaskList,
				TaskItem.configure({ nested: true }),
				MarkableSubscript,
				MarkableSuperscript,
				Dropcursor,
				Gapcursor,
				TextStyle
			],
			content: content,
			onUpdate: ({ editor }) => {
				content = editor.getHTML();
			}
		});

		editor.commands.focus('start');
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
