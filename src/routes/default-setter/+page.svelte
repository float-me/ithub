<script lang="ts">
	import { wordGraph } from '../word-graph-store';
	import { goto } from '$app/navigation';

	let defaultStr: string;
	let value: string = '';
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			event.preventDefault();
			if (!$wordGraph.charMap.get(value[0])?.outWords.includes(value)) {
				value = '';
				return;
			}

			defaultStr = value;
			goto('../editor', { state: { defaultStr } });
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
	<span
		>시작 단어를 입력하세요! (시작 음절만 고정됩니다, 스페이스로 넘어가기)</span
	>
</div>
<input
	class="input input-accent"
	on:keydown={handleKeyDown}
	bind:value
	use:init
	spellcheck="false"
/>
