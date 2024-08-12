<script lang="ts">
	import WordTag from './word-tag.svelte';
	import InputTag from './input-tag.svelte';
	import { Head, WordNode } from '$lib/word';
	import { wordGraph } from '$lib/stores/word-graph-store';
	import { current, root } from '$lib/stores/word-node-store';

	export let defaultHeadValue: string;
	let defaultHead = new Head(defaultHeadValue, 0);

	$current = new WordNode(defaultHead, undefined);
	$root = $current;
	$: isSelecting = $current.child !== undefined;

	let inputTag: InputTag;

	function handleCreate(event: CustomEvent<{}>) {
		let tail = inputTag.getTail();
		let word = $current.head.value + tail;
		if (!$wordGraph.has(word) || $current.before.includes(word)) {
			let fail = true;
			if (word.length === 2) {
				for (let [index, head] of $current.head.candidates.entries()) {
					let succ = $wordGraph.charMap.get(head)?.successors;
					if (!succ || !succ.has(tail[tail.length - 1])) continue;
					let outWords = $wordGraph.charMap.get(head)?.outWords;
					if (!outWords) continue;
					for (let word of outWords) {
						if ($current.before.includes(word)) continue;
						if (word[word.length - 1] === tail[tail.length - 1]) {
							$current.head.index = index;
							tail = word.slice(1);
							fail = false;
							break;
						}
					}
					if (!fail) break;
				}
			}
			if (fail) {
				inputTag.clear();
				return;
			}
		}
		$current = $current.createChild(tail);
	}

	function handleDelete(event: CustomEvent<{}>) {
		if ($current.parent) {
			$current = $current.parent;
			$current.clearChild();
		} else {
			return;
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowLeft':
				if (event.ctrlKey) {
					$current = $current.root;
				} else {
					if (!$current.parent) return;
					$current = $current.parent;
				}
				break;
			case 'ArrowRight':
				if (event.ctrlKey) {
					$current = $current.leaf;
				} else {
					if (!$current.child) return;
					$current = $current.child;
				}
				break;
			case 'Control':
				break;
			default:
				console.log('default case');
				if (!isSelecting) {
					inputTag.handleKeyDown(event);
				} else {
					console.log('selecting case');
					$current.clearChild();
					$current = $current;
					inputTag.handleSelectingKeyDown(event);
				}
		}
	}

	function handleSelect(
		event: CustomEvent<{ index: number; isBefore: boolean }>,
	) {
		if (event.detail.isBefore) {
			let beforeStep = $current.before.length - event.detail.index;
			for (let i = 0; i < beforeStep; i++) {
				if (!$current.parent) return;
				$current = $current.parent;
			}
		} else {
			let afterStep = event.detail.index + 1;
			for (let i = 0; i < afterStep; i++) {
				if (!$current.child) return;
				$current = $current.child;
			}
		}
		inputTag.focus();
	}
</script>

<div class="flex flex-wrap gap-x-2 gap-y-4">
	{#each $current.before as word, i}
		<WordTag on:select={handleSelect} index={i} isBefore={true} {word} />
	{/each}
	<InputTag
		bind:this={inputTag}
		on:create={handleCreate}
		on:delete={handleDelete}
		on:keydown={handleKeyDown}
	/>
	{#each $current.after as word, i}
		<WordTag on:select={handleSelect} index={i} isBefore={false} {word} />
	{/each}
	<!-- <div class="join join-vertical">
		{#each $current.accumulatedTags as tag}
			<input
				type="radio"
				class="btn join-item inactive"
				aria-label={tag}
			/>
		{/each}
	</div> -->
</div>
