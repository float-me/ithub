<script lang="ts">
	export let height: number;
</script>

<button on:click>
	<svg viewBox="0 0 200 200" {height} class="stroke-6" fill="none">
		<circle
			class="fill-neutral-content stroke-neutral stroke-4"
			cx="105"
			cy="115"
			r="80"
		></circle>
		<rect
			width="135"
			height="55"
			x="60"
			y="95"
			rx="10"
			ry="10"
			class="fill-neutral-content stroke-neutral stroke-4"
		>
		</rect>
		{#each Array(3).keys() as i}
			<line
				x1={120 + 20 * i}
				y1="150"
				x2={150 + 20 * i}
				y2="95"
				class="stroke-neutral"
			></line>
		{/each}

		<path class="stroke-accent" d="M 69 127 C 71 34 121 139 139 78"></path>
		<circle class="stroke-primary" cx="75%" cy="25%" r="15%"></circle>
		<circle class="stroke-secondary" cx="25%" cy="75%" r="15%"></circle>
	</svg>
</button>
