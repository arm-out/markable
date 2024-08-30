<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';
	import Editor from '../lib/Editor.svelte';
	import { all, createLowlight } from 'lowlight';

	const lowlight = createLowlight(all);
</script>

<div class="container">
	<Editor {lowlight} />
</div>
