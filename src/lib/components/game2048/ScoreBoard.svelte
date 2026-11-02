<script>
	let { score = 0, best = 0 } = $props();

	const scoreLabel = $derived(score.toLocaleString('en-US'));
	const bestLabel = $derived(best.toLocaleString('en-US'));
</script>

<dl class="scores">
	<div class="score-card">
		<dt>Score</dt>
		<dd>{scoreLabel}</dd>
	</div>
	<div class="score-card best">
		<dt>Best</dt>
		<dd>{bestLabel}</dd>
	</div>
</dl>

<style>
	.scores {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-3);
		margin: 0;
	}

	.score-card {
		padding: var(--space-3) var(--space-4);
		background: var(--bg-surface);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		text-align: center;
	}

	.score-card.best {
		border-color: var(--accent-cyan-quiet);
	}

	dt {
		color: var(--text-muted);
		font-size: var(--text-xs);
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	dd {
		margin: var(--space-1) 0 0;
		color: var(--accent-primary);
		font-size: var(--text-xl);
		font-variant-numeric: tabular-nums;
		font-weight: 800;
		line-height: 1.1;
	}

	.best dd {
		color: var(--accent-cyan);
	}
</style>
