<script lang="ts">
	import { goto } from '$app/navigation';
	import { current, root } from '$lib/stores/word-node-store';
	import { Head, WordNode } from '$lib/word';

	let value: string = '';
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			event.preventDefault();
			if (value.length === 0) return;
			goto('../editor');
			let defaultHead = new Head(value[0], 0);

			$current = new WordNode(defaultHead, undefined);
			$root = $current;
		}
	}
	function init(el: HTMLInputElement) {
		el.focus();
	}
</script>

<div role="alert" class="alert">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		class="stroke-info h-6 w-6 shrink-0"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		></path>
	</svg>
	<span>시작 음절을 입력하세요! (스페이스로 넘어가기)</span>
</div>
<div class="m-4">
	<input
		class="input input-accent"
		on:keydown={handleKeyDown}
		bind:value
		use:init
		spellcheck="false"
	/>
</div>
