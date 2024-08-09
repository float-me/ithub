<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let name: string;
	export let index: number;

	function handleClick(event: MouseEvent) {
		dispatch('select', { index: index });
	}
</script>

<button class="btn btn-neutral" on:click={handleClick}>#{name}</button>
