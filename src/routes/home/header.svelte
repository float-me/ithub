<script lang="ts">
	import { goto } from '$app/navigation';
	import ThemeModal from '../components/theme-controller/theme-modal.svelte';
	import Logo from '../components/logo.svelte';
	import { onMount } from 'svelte';

	function handleOnClick(event: Event) {
		goto('/');
	}

	let height = 0;
	onMount(() => {
		let maybeHeight = document.getElementById('header')?.clientHeight;
		height = maybeHeight ? maybeHeight : height;
	});

	function gotoEditor(event: MouseEvent) {
		console.log('move!');
		goto('/home/prepare/data-load');
	}
</script>

<div class="m-2">
	<div class="navbar bg-base-300 rounded-md">
		<div class="navbar-start" id="header">
			<div class="flex-none mr-4">
				<Logo on:click={handleOnClick} {height} />
			</div>
			<div
				id="header-explain"
				class="align-middle"
				style="user-drag: none;"
			>
				<p class="font-bold text-xl text-primary">잇허브</p>
				<p class="text-sm pl-2">끝말잇기 연구 통합 플랫폼</p>
			</div>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				<li>
					<button class="btn btn-ghost" on:click={gotoEditor}
						>Editor</button
					>
				</li>
			</ul>
		</div>
		<div class="navbar-end">
			<ThemeModal />
		</div>
	</div>
</div>
