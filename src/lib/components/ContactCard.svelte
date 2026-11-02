<script>
	let { title, description, href, linkLabel, icon } = $props();
</script>

<article class="contact-card">
	{#if icon === 'email'}
		<svg class="contact-icon" aria-hidden="true" viewBox="0 0 24 24">
			<rect x="2.5" y="5.5" width="19" height="13" rx="2"></rect>
			<path d="M3.5 7l8.5 6.5L20.5 7"></path>
		</svg>
	{:else if icon === 'github'}
		<svg class="contact-icon" aria-hidden="true" viewBox="0 0 24 24">
			<path d="M9 7l-5 5 5 5"></path>
			<path d="M15 7l5 5-5 5"></path>
		</svg>
	{/if}

	<h3>{title}</h3>
	<p>{description}</p>
	<p class="link-row">
		<a class="contact-link" {href} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
			{linkLabel}
		</a>
	</p>
</article>

<style>
	.contact-card {
		display: flex;
		flex-direction: column;
		padding: var(--space-5);
		background: var(--bg-surface);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
	}

	.contact-icon {
		display: block;
		width: 2rem;
		height: 2rem;
		margin-bottom: var(--space-3);
		color: var(--accent-cyan);
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	h3 {
		margin-bottom: var(--space-2);
	}

	p {
		margin-bottom: var(--space-3);
		font-size: var(--text-sm);
	}

	.link-row {
		margin-top: auto;
		margin-bottom: 0;
	}

	.contact-link {
		display: inline-block;
		padding: var(--space-2) 0;
		font-weight: 650;
		overflow-wrap: anywhere;
	}
</style>
