<script lang="ts">
	import Tag from './tag.svelte';
	import { current } from '$lib/stores/word-node-store';
	import { searched } from '$lib/stores/search-state-store';

	let value: string;
	let inputBind: HTMLInputElement;

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			event.preventDefault();
			if (!value) return;
			if ($current.tags.includes(value)) {
				value = '';
				return;
			}
			$current.tags = $current.tag(value);
			$searched = false;
			value = '';
		}
	}

	function handleOnSelect(event: CustomEvent<{ index: number }>) {
		$current.tags = $current.untag(event.detail.index);
		$searched = false;
		inputBind.focus();
	}

	function init(el: HTMLInputElement) {
		el.focus();
	}
</script>

<div class="flex flex-col space-y-4 h-full">
	<div class="grow">
		<div class="rounded-md p-4 h-full bg-base-100">
			<div class="flex flex-wrap gap-x-2 gap-y-4">
				{#each $current.tags as name, index}
					<Tag {name} {index} on:select={handleOnSelect} />
				{/each}
			</div>
		</div>
	</div>

	<div class="flex-none">
		<input
			placeholder="Input tags..."
			class="input w-max"
			id="prop-editor-input"
			bind:value
			bind:this={inputBind}
			on:keydown={handleKeyDown}
			use:init
			spellcheck="false"
			autocomplete="off"
		/>
	</div>
</div>
