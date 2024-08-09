<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Word } from '$lib/word';

	const dispatch = createEventDispatcher();

	let inputBind: HTMLInputElement;

	export let word: Word;
	$: tail = word.tail;
	$: heading = word.heading;
	$: headingIndex = word.headingIndex;
	$: activeHead = heading[headingIndex];
	$: fullWord = activeHead + tail;
	$: inputWidth = Math.max(Math.min(fullWord.length, 10), 0.5);
	$: inputStyle = `width: ${inputWidth + 2}rem`;

	export function handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			event.preventDefault();
			if (tail.length === 0) {
				return;
			}
			dispatch('create', {});
		} else if (event.key === 'Backspace') {
			event.preventDefault();
			if (tail.length === 0) {
				dispatch('delete', {});
			}
		} else if (event.key === 'Tab') {
			event.preventDefault();
			if (heading.length == 1) return;
			headingIndex += 1;
			if (headingIndex === heading.length) {
				headingIndex = 0;
			}
		}
	}

	export function handleSelectingKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			event.preventDefault();
		} else if (event.key === 'Backspace') {
			event.preventDefault();
		} else if (event.key === 'Tab') {
			event.preventDefault();
			if (heading.length == 1) return;
			headingIndex += 1;
			if (headingIndex === heading.length) {
				headingIndex = 0;
			}
		}
	}

	function init(el: HTMLInputElement) {
		el.focus();
	}

	export function focus() {
		inputBind.focus();
	}

	export function getWord() {
		return new Word(word.head, tail, headingIndex);
	}

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		// Extract the part of the value that comes after the head
		tail = input.value.slice(1);
	}
</script>

<input
	on:keydown
	on:input={handleInput}
	use:init
	bind:this={inputBind}
	value={fullWord}
	spellcheck="false"
	class="btn btn-accent"
	id="word-editor-input"
	style={inputStyle}
/>
