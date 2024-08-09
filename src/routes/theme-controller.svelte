<script lang="ts">
	import ThemeTag from './theme-tag.svelte';

	let themeValues = ['light', 'dark', 'retro', 'dracula', 'nord'];
</script>

<div class="join join-vertical">
	{#each themeValues as theme}
		<input
			type="radio"
			name="theme-buttons"
			class="btn theme-controller join-item"
			aria-label={theme}
			value={theme}
		/>
		<ThemeTag {theme} />
	{/each}
</div>
