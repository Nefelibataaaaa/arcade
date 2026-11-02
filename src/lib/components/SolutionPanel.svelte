<script>
	let { rows = [] } = $props();
</script>

<div class="solution-panel">
	<h2 id="solution-heading">Complete grid solution</h2>
	<ul>
		{#each rows as row (row.rowNumber)}
			<li>
				<strong>Row {row.rowNumber} ({row.clueNumber} Across):</strong>
				<span class="letters">
					{#each row.letters as letter, index (index)}
						<span class="letter" class:blocked={letter === '#'}>{letter === '#' ? '■' : letter}</span>
					{/each}
				</span>
			</li>
		{/each}
	</ul>
</div>

<style>
	.solution-panel {
		padding: var(--space-5);
		background: var(--bg-surface);
		border: 1px solid var(--border-color);
		border-left: 4px solid var(--accent-cyan);
		border-radius: var(--radius-md);
	}

	.solution-panel h2 {
		font-size: var(--text-lg);
	}

	.solution-panel ul {
		margin: 0;
		padding-left: var(--space-5);
	}

	.solution-panel li {
		margin-bottom: var(--space-2);
	}

	.letters {
		display: inline-flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		margin-left: var(--space-2);
	}

	.letter {
		display: inline-grid;
		place-items: center;
		width: 1.6rem;
		height: 1.6rem;
		background: var(--bg-elevated);
		border-radius: 3px;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: 700;
	}

	.letter.blocked {
		background: var(--blocked-bg);
		color: var(--text-muted);
	}
</style>
