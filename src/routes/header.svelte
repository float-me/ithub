<script lang="ts">
	import { goto } from '$app/navigation';
	import ThemeModal from './theme-modal.svelte';

	function handleOnClick(event: Event) {
		goto('/');
	}
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<!-- <img src={icon} alt="icon" id="icon" /> -->
		<button
			type="button"
			on:click={handleOnClick}
			class="btn btn-ghost text-xl"
		>
			잇허브
		</button>
	</div>
	<div class="flex-none">
		<ThemeModal />
	</div>
</div>
