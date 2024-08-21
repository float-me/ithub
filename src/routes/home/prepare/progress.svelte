<script lang="ts">
	export let stepIdx: number;
	const steps = ['Select Rule', 'Set Default'];
</script>

<div class="flex flex-col h-full">
	<h1 class="text-2xl self-center">Create New Project</h1>
	<ul class="steps flex-none">
		{#each steps as step, i}
			{#if i <= stepIdx}
				<li class="step step-primary">{step}</li>
			{:else}
				<li class="step">{step}</li>
			{/if}
		{/each}
	</ul>
	<div class="grow">
		<slot></slot>
	</div>
</div>
