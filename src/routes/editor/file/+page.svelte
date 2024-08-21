<script lang="ts">
	import { root } from '$lib/stores/word-node-store';

	function save(event: MouseEvent) {
		alert($root.foldNewick());
	}
</script>

<button class="btn btn-neutral" on:click={save}>Save</button>
