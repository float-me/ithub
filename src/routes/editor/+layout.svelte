<script>
	import Menu from './menu.svelte';
</script>

<div class="flex flex-col h-full p-4 space-y-4">
	<div class="grow">
		<slot />
	</div>
	<Menu />
</div>
