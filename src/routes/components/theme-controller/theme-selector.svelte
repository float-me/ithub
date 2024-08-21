<script lang="ts">
	import ThemeTag from './theme-tag.svelte';

	export let theme: string;
	export let isSelected: boolean;
</script>

{#if isSelected}
	<div
		class="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2"
		data-set-theme={theme}
	>
		<ThemeTag on:click {theme} />
	</div>
{:else}
	<div
		class="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent"
		data-set-theme={theme}
	>
		<ThemeTag on:click {theme} />
	</div>
{/if}
