<script>
	import Header from './header.svelte';
</script>

<div class="flex flex-col h-full">
	<div class="flex-none">
		<Header />
	</div>
	<div class="grow">
		<slot></slot>
	</div>
</div>
