<script lang="ts">
	import Editor from '$lib/Editor.svelte';
	import { invoke } from '@tauri-apps/api/core';

	let content = '';

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

	<Editor {content} />
</div>
