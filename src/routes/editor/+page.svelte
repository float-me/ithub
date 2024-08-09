<script lang="ts">
	import WordEditor from './word-editor/editor.svelte';
	import PropEditor from './prop-editor/editor.svelte';
	import { page } from '$app/stores';

	interface PageState {
		defaultStr: string;
	}

	$: state = ($page as unknown as { state: PageState }).state;
	$: defaultStr = state.defaultStr;
	let wordEditor: WordEditor;
	let propEditor: PropEditor;
</script>

<div class="flex w-full flex-col border-opacity-50">
	<!-- Content Area -->
	<main class="flex-1 p-4">
		<!-- Top Card (100% width, narrow vertically) -->
		<div class="w-full mb-4">
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body p-4">
					<h2 class="card-title">Top Task (100% width)</h2>
					<p>Description of the top task.</p>
				</div>
			</div>
		</div>
		<!-- Bottom Cards (70% and 30% width, fit vertically) -->
		<div class="flex flex-wrap lg:flex-nowrap h-full">
			<!-- Left Card (70% width) --><div class="w-full lg:w-3/4 lg:mr-4 h-full">
				<div class="card bg-base-100 shadow-xl h-full">
					<div class="card-body p-4 h-full">
						<WordEditor {defaultStr} bind:this={wordEditor} />
					</div>
				</div>
			</div>

			<!-- Right Card (30% width) -->
			<div class="w-full lg:w-1/4">
				<div class="card bg-base-200 shadow-xl h-full">
					<div class="card-body p-4 h-full">
						<PropEditor bind:this={propEditor} />
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
