<script>
	let { onnewgame = () => {} } = $props();
</script>

<button class="btn btn-primary new-game" type="button" onclick={onnewgame}>
	<span aria-hidden="true">↻</span>
	New game
</button>

<style>
	.new-game {
		width: 100%;
		font-size: var(--text-base);
	}
</style>
