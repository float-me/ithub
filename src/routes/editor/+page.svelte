<script lang="ts">
	import PlayEditor from './play-editor/editor.svelte';
	import TagEditor from './tag-editor.svelte';
	import { page } from '$app/stores';
	import SearchBar from './search-bar.svelte';

	interface PageState {
		default: string;
	}

	$: state = ($page as unknown as { state: PageState }).state;
	$: defaultHeadValue = state.default;
	let wordEditor: PlayEditor;
	let tagEditor: TagEditor;
</script>

<div class="m-4">
	<div class="card bg-neutral shadow-xl">
		<div class="card-body p-4">
			<SearchBar />
		</div>
	</div>
</div>

<div class="grid grid-cols-4 gap-4 m-4">
	<div class="col-span-3">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body p-4">
				<PlayEditor {defaultHeadValue} bind:this={wordEditor} />
			</div>
		</div>
	</div>
	<div>
		<div class="card bg-neutral shadow-xl">
			<div class="card-body p-4">
				<TagEditor bind:this={tagEditor} />
			</div>
		</div>
	</div>
</div>
