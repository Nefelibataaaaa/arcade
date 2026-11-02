<script>
	let {
		title,
		description,
		status,
		href,
		cta,
		featured = false,
		available = true,
		meta = ''
	} = $props();
</script>

<article class="game-card" class:featured class:coming-soon={!available}>
	<div>
		<span class="status-tag">{status}</span>
		<h3>{title}</h3>
		<p>{description}</p>
		{#if meta}
			<p class="meta">{meta}</p>
		{/if}
	</div>
	<a class={available ? 'btn btn-primary' : 'btn btn-ghost'} {href}>{cta}</a>
</article>

<style>
	.game-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: var(--space-5);
		padding: var(--space-5);
		background: var(--bg-surface);
		border: 2px solid var(--border-color);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
		transition:
			transform var(--duration-base) var(--ease-out),
			border-color var(--duration-base) var(--ease-out);
	}

	.game-card:hover {
		transform: translateY(-3px);
		border-color: var(--accent-primary);
	}

	.game-card.featured {
		background:
			linear-gradient(160deg, rgb(255 191 0 / 10%), transparent 55%),
			var(--bg-surface);
		border-color: var(--accent-primary);
	}

	.game-card.coming-soon {
		border-style: dashed;
		background: var(--bg-surface);
	}

	.status-tag {
		display: inline-block;
		margin-bottom: var(--space-3);
		padding: var(--space-1) var(--space-2);
		background: var(--bg-elevated);
		color: var(--accent-cyan);
		border-radius: var(--radius-sm);
		font-size: var(--text-xs);
		font-weight: 800;
		letter-spacing: 0.03em;
		text-transform: uppercase;
	}

	.featured .status-tag {
		background: var(--accent-primary);
		color: var(--bg-primary);
	}

	h3 {
		margin-bottom: var(--space-2);
	}

	p {
		margin-bottom: var(--space-3);
		font-size: var(--text-sm);
	}

	.meta {
		margin: 0;
		color: var(--accent-cyan);
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: 0.02em;
	}

	.game-card > a {
		align-self: flex-start;
	}
</style>
