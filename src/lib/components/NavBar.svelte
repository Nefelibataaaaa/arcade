<script>
	import { base } from '$app/paths';
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/2048/', label: '2048' },
		{ href: '/crossword/', label: 'Crossword' },
		{ href: '/about/', label: 'About' },
		{ href: '/contact/', label: 'Contact' }
	];

	let menuOpen = $state(false);
	const pathname = $derived(page.url.pathname);

	/** @param {string} href */
	function isActive(href) {
		const target = `${base}${href}`;
		if (href === '/') return pathname === `${base}/` || pathname === base || pathname === '';
		return pathname.startsWith(target);
	}
</script>

<header class="site-header">
	<div class="header-inner">
		<a class="site-title" href="{base}/" onclick={() => (menuOpen = false)}>
			<span class="title-mark" aria-hidden="true">🕹️</span>
			<span>Cheney Gong's Arcade</span>
		</a>

		<button
			class="menu-toggle"
			type="button"
			aria-label="Toggle navigation menu"
			aria-expanded={menuOpen}
			aria-controls="primary-nav"
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="menu-bars" aria-hidden="true"><span></span><span></span><span></span></span>
			<span class="menu-text">Menu</span>
		</button>

		<nav
			id="primary-nav"
			class="site-nav"
			class:open={menuOpen}
			aria-label="Primary navigation"
		>
			<ul>
				{#each links as link (link.href)}
					<li>
						<a
							href={base + link.href}
							class:active={isActive(link.href)}
							aria-current={isActive(link.href) ? 'page' : undefined}
							onclick={() => (menuOpen = false)}
						>{link.label}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgb(26 29 45 / 94%);
		border-bottom: 2px solid var(--border-color);
		backdrop-filter: blur(10px);
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		max-width: var(--max-width);
		min-height: var(--header-height);
		margin: 0 auto;
		padding: var(--space-2) var(--page-gutter);
	}

	.site-title {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--accent-primary);
		font-size: var(--text-lg);
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: 0.015em;
		text-decoration: none;
	}

	.site-title:hover {
		color: var(--accent-hover);
	}

	.title-mark {
		font-size: 1.1em;
	}

	.menu-toggle {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		min-width: var(--touch-target);
		min-height: var(--touch-target);
		padding: var(--space-2) var(--space-3);
		background: var(--bg-elevated);
		color: var(--text-primary);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		font-weight: 700;
	}

	.menu-bars {
		display: grid;
		gap: 3px;
		width: 18px;
	}

	.menu-bars span {
		display: block;
		height: 2px;
		background: currentColor;
		border-radius: 2px;
	}

	.site-nav {
		display: none;
	}

	.site-nav.open {
		display: block;
		width: 100%;
		padding-bottom: var(--space-2);
	}

	.site-nav ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.site-nav a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: var(--touch-target);
		min-height: var(--touch-target);
		padding: var(--space-2) var(--space-3);
		color: var(--text-secondary);
		border: 2px solid transparent;
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		font-weight: 650;
		text-decoration: none;
		transition:
			background-color var(--duration-base) var(--ease-out),
			color var(--duration-base) var(--ease-out);
	}

	.site-nav a:hover {
		background: var(--bg-elevated);
		color: var(--accent-hover);
	}

	.site-nav a.active {
		background: var(--accent-primary);
		color: var(--bg-primary);
		font-weight: 800;
	}

	@media (min-width: 760px) {
		.menu-toggle {
			display: none;
		}

		.site-nav,
		.site-nav.open {
			display: block;
			width: auto;
			padding-bottom: 0;
		}

		.site-nav ul {
			flex-wrap: nowrap;
		}
	}

	@media (max-width: 759px) {
		.header-inner {
			flex-wrap: wrap;
		}

		.site-title {
			font-size: var(--text-base);
		}

		.site-nav.open ul {
			justify-content: flex-start;
		}
	}

	@media (max-width: 380px) {
		.header-inner {
			gap: var(--space-2);
			padding-inline: var(--space-3);
		}

		.site-title {
			font-size: 0.95rem;
		}

		.menu-toggle {
			padding-inline: var(--space-2);
		}

		.menu-text {
			display: none;
		}
	}
</style>
