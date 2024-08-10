<script lang="ts">
	import ThemeController from './theme-controller.svelte';
	let modal: HTMLDialogElement;
</script>

<!-- Open the modal using ID.showModal() method -->
<button
	class="btn"
	on:click={() => {
		modal.showModal();
	}}>Change Theme</button
>
<dialog bind:this={modal} class="modal">
	<ThemeController />
	<button
		class="btn"
		on:click={() => {
			modal.close();
		}}>close</button
	>
</dialog>
