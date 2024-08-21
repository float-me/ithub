<script lang="ts">
	import { onMount } from 'svelte';
	import LoadingPage from './components/loading-page.svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		goto('/home');
	});
</script>

<LoadingPage text="Loading Pages..." />
