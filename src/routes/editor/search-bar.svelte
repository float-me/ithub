<script lang="ts">
	import { searched } from '$lib/stores/search-state-store';
	import { current, root } from '$lib/stores/word-node-store';
	import type { WordNode } from '$lib/word';
	import SearchIcon from './search-icon.svelte';
	import Tag from './tag.svelte';

	let value: string;
	let inputBind: HTMLInputElement;

	let tags: string[] = [];
	let index = 0;
	let result: WordNode[] = [];

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
			$searched = false;
		} else if (event.key === 'Enter') {
			if ($searched) {
				if (result.length > 0) {
					index += 1;
					if (index === result.length) index = 0;
					setCurrent();
				}
			} else {
				let searchSet = new Set(tags);
				result = $root.search(searchSet);
				index = 0;
				setCurrent();
				$searched = true;
			}
		}
	}

	function setCurrent() {
		let node = result[index];
		node.clearChild();
		$current = node;
	}

	function handleOnSelect(event: CustomEvent<{ index: number }>) {
		tags.splice(event.detail.index, 1);
		tags = tags;
		$searched = false;
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

	{#if $searched}
		{#if result.length > 0}
			<div class="btn btn-primary">({index + 1}/{result.length})</div>
		{:else}
			<div class="btn btn-primary">(0/0)</div>
		{/if}
	{/if}
</div>
