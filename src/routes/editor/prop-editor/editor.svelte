<script lang="ts">
	import PropTag from './prop-tag.svelte';
	import { current } from '../current-store';

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
			$current.tags = [...$current.tags, value];
			value = '';
		}
	}

	function handleOnSelect(event: CustomEvent<{ index: number }>) {
		$current.tags.splice(event.detail.index, 1);
		$current.tags = $current.tags;
		inputBind.focus();
	}

	function init(el: HTMLInputElement) {
		el.focus();
	}
</script>

<div class="join join-vertical gap-4">
	<div class="card bg-base-100 p-4">
		<div class="flex flex-wrap gap-x-2 gap-y-4">
			{#each $current.tags as name, index}
				<PropTag {name} {index} on:select={handleOnSelect} />
			{/each}
		</div>
	</div>
	<input
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
