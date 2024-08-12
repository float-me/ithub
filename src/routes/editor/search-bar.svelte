<script lang="ts">
	import { current, root } from '$lib/stores/word-node-store';
	import SearchIcon from './search-icon.svelte';
	import Tag from './tag.svelte';

	let value: string;
	let inputBind: HTMLInputElement;

	let tags: string[] = [];

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			event.preventDefault();
			if (!value) return;
			if (tags.includes(value)) {
				value = '';
				return;
			}
			tags = [...tags, value];
			value = '';
		} else if (event.key === 'Enter') {
			let searchSet = new Set(tags);
			let result = $root.search(searchSet);
			if (result.length > 0) $current = result[0];
		}
	}

	function handleOnSelect(event: CustomEvent<{ index: number }>) {
		tags.splice(event.detail.index, 1);
		tags = tags;
		inputBind.focus();
	}
</script>

<div class="flex flex-wrap gap-x-2 gap-y-4">
	<div class="relative mr-2">
		<div
			class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
		>
			<SearchIcon />
		</div>
		<input
			placeholder="Search for tags..."
			class="input w-full p-4 ps-10"
			bind:value
			bind:this={inputBind}
			on:keydown={handleKeyDown}
			spellcheck="false"
			autocomplete="off"
		/>
	</div>

	{#each tags as name, index}
		<Tag {name} {index} color="primary" on:select={handleOnSelect} />
	{/each}
</div>
