<script lang="ts">
	import { invoke } from '@tauri-apps/api/core';

	let data = '';

	async function open() {
		invoke('open_file').then((res) => {
			const buffer = new Uint8Array(res as ArrayBuffer);
			data = String.fromCharCode(...buffer);
		});
	}
</script>

<button on:click={open}>Open</button>
<div>{data}</div>
