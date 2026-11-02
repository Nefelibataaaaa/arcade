<footer class="site-footer">
	<div class="footer-inner">
		<p>&copy; 2026 Cheney Gong. Built with SvelteKit, semantic HTML, and custom CSS.</p>
		<p class="footer-links">
			<a href="https://github.com/Nefelibataaaaa" rel="noreferrer">GitHub</a>
			<span aria-hidden="true">&middot;</span>
			<a href="mailto:gong.can@northeastern.edu">Email</a>
		</p>
	</div>
</footer>

<style>
	.site-footer {
		margin-top: auto;
		background: var(--bg-surface);
		border-top: 1px solid var(--border-color);
		color: var(--text-secondary);
		font-size: var(--text-sm);
	}

	.footer-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2) var(--space-5);
		max-width: var(--max-width);
		margin: 0 auto;
		padding: var(--space-5) var(--page-gutter);
	}

	.site-footer p {
		margin: 0;
		max-width: none;
	}

	.footer-links {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.footer-links a {
		display: inline-flex;
		align-items: center;
		min-height: var(--touch-target);
		font-weight: 650;
	}
</style>
