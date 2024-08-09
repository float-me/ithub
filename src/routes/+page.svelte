<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { wordGraph } from './word-graph-store';
	import { WordGraph } from '$lib/graph';

	async function fetchWordList(url: URL) {
		let response = await fetch(url);
		let text = await response.text();
		return text.split('\n').map((x) => x.trim());
	}

	let pos = [
		'명사',
		'의존명사',
		'대명사',
		'수사',
		'부사',
		'관형사',
		'감탄사',
		'구',
	];

	async function loadWordGraph() {
		const wordLists = await Promise.all(
			pos.map((p) =>
				fetchWordList(
					new URL(
						`https://singrum.github.io/KoreanDict/oldict/db/${encodeURI(p)}`,
					),
				),
			),
		);
		let wordList = wordLists.reduce((a, b) => a.concat(b), []);

		return new WordGraph(wordList);
	}

	onMount(async () => {
		$wordGraph = await loadWordGraph();
		// After loading, navigate to the next page and pass the loaded data
		goto('/default-setter');
	});
</script>

<span class="loading loading-dots loading-lg"></span>
