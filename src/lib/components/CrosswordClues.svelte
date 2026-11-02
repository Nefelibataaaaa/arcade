<script>
	let { across = [], down = [] } = $props();
</script>

<div class="clues">
	<section aria-labelledby="across-heading">
		<h2 id="across-heading">Across</h2>
		<ol class="clue-list">
			{#each across as clue (clue.number)}
				<li value={clue.number}>
					{clue.text}
					<span class="length">({clue.length})</span>
				</li>
			{/each}
		</ol>
	</section>

	<section aria-labelledby="down-heading">
		<h2 id="down-heading">Down</h2>
		<ol class="clue-list">
			{#each down as clue (clue.number)}
				<li value={clue.number}>
					{clue.text}
					<span class="length">({clue.length})</span>
				</li>
			{/each}
		</ol>
	</section>
</div>

<style>
	.clues {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
		gap: var(--space-5);
	}

	h2 {
		margin-bottom: var(--space-3);
		font-size: var(--text-lg);
	}

	.clue-list {
		margin: 0;
		padding-left: var(--space-5);
	}

	.clue-list li {
		margin-bottom: var(--space-2);
		padding-left: var(--space-1);
		font-size: var(--text-sm);
		line-height: var(--leading-snug);
	}

	.clue-list li::marker {
		color: var(--accent-primary);
		font-weight: 800;
	}

	.length {
		color: var(--text-muted);
		white-space: nowrap;
	}
</style>
