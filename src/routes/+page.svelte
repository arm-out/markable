<script lang="ts">
	import Editor from '$lib/Editor.svelte';
	import type { File } from '$lib/types';
	import { invoke } from '@tauri-apps/api/core';

	let content = '';
	let path = '';

	async function open() {
		invoke('open_file')
			.then((res) => {
				const file = res as File;
				console.log(file);
				content = file.content;
				path = file.path;
			})
			.catch((err) => {
				console.log(err);
			});
	}
</script>

<div style:min-height="100vh">
	<button onclick={open}>Open</button>
	<button>Save As</button>
	<button>Save</button>

	<Editor {content} {path} />
</div>
