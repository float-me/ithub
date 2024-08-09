<script lang="ts">
	import { Word } from '$lib/word';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let word: Word;
	export let index: number;
	export let isBefore: boolean;

	function handleClick(event: MouseEvent) {
		dispatch('select', { index: index, isBefore: isBefore });
	}
</script>

<button class="btn btn-neutral" on:click={handleClick}>{word.word}</button>
