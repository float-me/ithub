<script lang="ts">
	import { goto } from '$app/navigation';
	import ThemeModal from './theme-controller/theme-modal.svelte';
	import Logo from './logo.svelte';
	import { onMount } from 'svelte';

	function handleOnClick(event: Event) {
		goto('/');
	}

	let height = 0;
	onMount(() => {
		let maybeHeight = document.getElementById('header')?.clientHeight;
		height = maybeHeight ? maybeHeight : height;
		console.log(height);
	});
</script>

<div id="header" class="flex bg-base-100 m-4">
	<div class="flex-none mr-4">
		<Logo on:click={handleOnClick} {height} />
	</div>
	<div
		id="header-explain"
		class="flex-1 align-middle"
		style="user-drag: none;"
	>
		<p class="font-bold text-xl text-primary">잇허브</p>
		<p class="text-sm pl-2">끝말잇기 연구 통합 플랫폼</p>
	</div>
	<div class="flex-none">
		<ThemeModal />
	</div>
</div>

<style>
	#header-explain {
		-webkit-user-drag: none;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
</style>
