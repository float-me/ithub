<script lang="ts">
	import ThemeSelector from './theme-selector.svelte';

	let themeValues = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter',
		'dim',
		'nord',
		'sunset',
	];

	// let dataTheme = document.documentElement.getAttribute('data-theme');
	let dataTheme = 'light';
	function setTheme(theme: string) {
		document.documentElement.setAttribute('data-theme', theme);
		dataTheme = theme;
	}
</script>

<div
	class=" rounded-box grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
>
	{#each themeValues as theme}
		<ThemeSelector
			{theme}
			isSelected={theme === dataTheme}
			on:click={() => {
				setTheme(theme);
			}}
		/>
	{/each}
</div>
