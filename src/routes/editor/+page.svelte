<script lang="ts">
	import PlayEditor from './play-editor/editor.svelte';
	import TagEditor from './tag-editor.svelte';
	import SearchBar from './search-bar.svelte';

	let wordEditor: PlayEditor;
	let tagEditor: TagEditor;
</script>

<!-- <button class="btn btn-neutral" on:click={createNewick}>Save</button> -->

<div class="flex flex-col h-full space-y-4">
	<div class="flex-none">
		<div class="rounded-md p-4 h-full bg-neutral">
			<SearchBar />
		</div>
	</div>

	<div class="grid grid-cols-4 gap-4 grow">
		<div class="col-span-3">
			<div class="rounded-md p-4 h-full bg-base-100 shadow-xl">
				<PlayEditor bind:this={wordEditor} />
			</div>
		</div>
		<div>
			<div class="rounded-md p-4 h-full bg-neutral">
				<TagEditor bind:this={tagEditor} />
			</div>
		</div>
	</div>
</div>
