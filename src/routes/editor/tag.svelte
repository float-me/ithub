<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let name: string;
	export let index: number;
	export let color = 'secondary';

	$: cls = 'btn btn-' + color;
	console.log(cls);

	function handleClick(event: MouseEvent) {
		dispatch('select', { index: index });
	}
</script>

<button class={cls} on:click={handleClick}>#{name}</button>
