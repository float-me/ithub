<script lang="ts">
	import Logo from './logo.svelte';

	export let text: string;
</script>

<div class="items-center justify-center flex flex-col w-full h-full">
	<Logo height={100} />
	<h2>{text}</h2>
	<span class="loading loading-dots loading-lg"></span>
</div>
