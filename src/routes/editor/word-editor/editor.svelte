<script lang="ts">
	import WordTag from './word-tag.svelte';
	import InputTag from './input-tag.svelte';
	import { Word, WordNode } from '$lib/word';
	import { wordGraph } from '../../word-graph-store';
	import { current } from '../current-store';

	export let defaultStr: string;

	let defaultWord = new Word(defaultStr[0], defaultStr.slice(1), 0);
	$current = new WordNode(defaultWord, undefined, undefined);
	$: isSelecting = $current.child !== undefined;

	let inputTag: InputTag;

	function handleCreate(event: CustomEvent<{}>) {
		let newWord = inputTag.getWord();
		if (
			!$wordGraph.has(newWord.word) ||
			$current.before.map((x) => x.word).includes(newWord.word)
		) {
			let fail = true;
			if (newWord.length === 2) {
				for (let [index, head] of newWord.heading.entries()) {
					let succ = $wordGraph.charMap.get(head)?.successors;
					if (!succ || !succ.has(newWord.last)) continue;
					let outWords = $wordGraph.charMap.get(head)?.outWords;
					if (!outWords) continue;
					for (let word of outWords) {
						if ($current.before.map((x) => x.word).includes(word)) continue;
						if (word[word.length - 1] === newWord.last) {
							newWord = new Word(newWord.head, word.slice(1), index);
							fail = false;
							break;
						}
					}
					if (!fail) break;
				}
			}
			if (fail) {
				let clearWord = new Word(newWord.head, '', newWord.headingIndex);
				$current.word = clearWord;
				return;
			}
		}
		let newCurrent = new Word(newWord.last, '', 0);
		$current.word = newWord;
		$current = $current.setChild(newCurrent);
	}

	function handleDelete(event: CustomEvent<{}>) {
		if ($current.parent) {
			let last = $current.parent.word;
			let newWord = new Word(last.head, '', last.headingIndex);
			$current = $current.parent;
			$current.setChild(undefined);
			$current.word = newWord;
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
				if (!isSelecting) {
					inputTag.handleKeyDown(event);
				} else {
					$current.setChild(undefined);
					$current.word = new Word($current.word.head, '', $current.word.headingIndex);
					inputTag.handleSelectingKeyDown(event);
				}
		}
	}

	function handleSelect(event: CustomEvent<{ index: number; isBefore: boolean }>) {
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

<div class="container">
	{#each $current.before as word, i}
		<WordTag on:select={handleSelect} index={i} isBefore={true} {word} />
	{/each}
	<InputTag
		word={$current.word}
		bind:this={inputTag}
		on:create={handleCreate}
		on:delete={handleDelete}
		on:keydown={handleKeyDown}
	/>
	{#each $current.after as word, i}
		<WordTag on:select={handleSelect} index={i} isBefore={false} {word} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		flex-wrap: wrap; /* Allows tags to wrap to the next line if needed */
		gap: 10px; /* Adjust the spacing as needed */
	}
</style>
