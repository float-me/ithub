<script lang="ts">
	import WordEditor from './word-editor/editor.svelte';
	import PropEditor from './prop-editor/editor.svelte';
	import { page } from '$app/stores';

	interface PageState {
		defaultStr: string;
	}

	$: state = ($page as unknown as { state: PageState }).state;
	$: defaultStr = state.defaultStr;
	let wordEditor: WordEditor;
	let propEditor: PropEditor;
</script>

<div class="m-4">
	<div class="card bg-neutral shadow-xl">
		<div class="card-body p-4">
			<h2 class="card-title">Top Task (100% width)</h2>
			<p>Description of the top task.</p>
		</div>
	</div>
</div>

<div class="grid grid-cols-4 gap-4 m-4">
	<div class="col-span-3">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body p-4">
				<WordEditor {defaultStr} bind:this={wordEditor} />
			</div>
		</div>
	</div>
	<div>
		<div class="card bg-neutral shadow-xl">
			<div class="card-body p-4">
				<PropEditor bind:this={propEditor} />
			</div>
		</div>
	</div>
</div>
