<script>
	let { items = [] } = $props();
</script>

<ol class="timeline">
	{#each items as item (item.title)}
		<li>
			<h3>{item.title}</h3>
			<p>{item.description}</p>
		</li>
	{/each}
</ol>

<style>
	.timeline {
		display: grid;
		gap: var(--space-4);
		margin: 0;
		padding: 0 0 0 var(--space-5);
		list-style: none;
		border-left: 2px solid var(--border-color);
	}

	.timeline li {
		position: relative;
		padding-left: var(--space-4);
	}

	.timeline li::before {
		content: '';
		position: absolute;
		top: 0.5rem;
		left: calc(var(--space-4) * -2.15);
		width: 0.75rem;
		height: 0.75rem;
		background: var(--accent-primary);
		border: 2px solid var(--bg-primary);
		border-radius: 50%;
		box-shadow: 0 0 0 2px var(--accent-primary);
	}

	h3 {
		margin: 0 0 var(--space-1);
		font-size: var(--text-base);
	}

	p {
		margin: 0;
		font-size: var(--text-sm);
	}
</style>
