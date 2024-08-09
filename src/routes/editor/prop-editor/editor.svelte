<script lang="ts">
	import PropTag from './prop-tag.svelte';
	import { current } from '../current-store';

	let value: string;
	let inputBind: HTMLInputElement;

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			event.preventDefault();
			if (!value) return;
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

<div class="join join-vertical">
	<div class="container">
		{#each $current.tags as name, index}
			<PropTag {name} {index} on:select={handleOnSelect} />
		{/each}
	</div>
	<input
		class="input w-max"
		id="prop-editor-input"
		bind:value
		bind:this={inputBind}
		on:keydown={handleKeyDown}
		use:init
	/>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		flex-wrap: wrap; /* Allows tags to wrap to the next line if needed */
		gap: 10px; /* Adjust the spacing as needed */
	}
</style>
