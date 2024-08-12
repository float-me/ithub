<script lang="ts">
	import { current } from '$lib/stores/word-node-store';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let inputBind: HTMLInputElement;

	$: tail = $current.child ? $current.child.parentTail : '';
	$: fullWord = $current.head.value + tail;
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
			if (tail.length === 0) {
				event.preventDefault();
				dispatch('delete', {});
			}
		} else if (event.key === 'Tab') {
			event.preventDefault();
			$current.head.rotate();
		}
	}

	export function handleSelectingKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			event.preventDefault();
		} else if (event.key === 'Backspace') {
			event.preventDefault();
		} else if (event.key === 'Tab') {
			event.preventDefault();
			$current.head.rotate();
		}
	}

	function init(el: HTMLInputElement) {
		el.focus();
	}

	export function focus() {
		inputBind.focus();
	}

	export function getTail() {
		return tail;
	}

	export function clear() {
		tail = '';
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
	autocomplete="off"
	class="btn btn-accent"
	id="word-editor-input"
	style={inputStyle}
/>
