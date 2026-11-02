<script>
	import { base } from '$app/paths';

	import GameCard from '$lib/components/GameCard.svelte';
	import { bestScores } from '$lib/state/scores.svelte.js';

	const bestLabel = $derived(
		bestScores.arcade2048 > 0
			? `Personal best: ${bestScores.arcade2048.toLocaleString('en-US')}`
			: 'No score yet — set the first one'
	);
</script>

<svelte:head>
	<title>Cheney Gong's Arcade — Home</title>
	<meta
		name="description"
		content="A curated arcade of browser games built with SvelteKit: play 2048 and the 6x6 mini crossword."
	/>
</svelte:head>

<section class="hero" aria-labelledby="hero-heading">
	<div class="hero-copy">
		<p class="eyebrow">Featured release · 2048</p>
		<h1 id="hero-heading">Welcome to The Web Arcade</h1>
		<p class="lede">
			A small collection of classic logic games rebuilt with Svelte 5 and a shared, accessible
			design system. Slide, merge, and chase the 2048 tile — then take a quieter turn with the
			6×6 mini crossword.
		</p>
		<div class="hero-actions">
			<a class="btn btn-primary" href="{base}/2048/">Play 2048</a>
			<a class="btn btn-secondary" href="{base}/crossword/">Play the Crossword</a>
		</div>
	</div>
	<img
		class="hero-graphic"
		src="{base}/hero-grid.svg"
		alt="A four-square grid icon in the arcade's gold and cyan colours, standing in for a game board."
		width="160"
		height="160"
	/>
</section>

<section aria-labelledby="catalog-heading">
	<div class="section-heading">
		<h2 id="catalog-heading">Arcade Cabinet Lineup</h2>
		<p>Two cabinets are powered up. The rest are being built during the semester.</p>
	</div>

	<div class="game-grid">
		<GameCard
			title="2048"
			description="The full 4×4 sliding tile puzzle with merge scoring, a persistent best score, seeded openings, and a keyboard or touch control scheme."
			status="Available now"
			href="{base}/2048/"
			cta="Launch 2048"
			featured
			meta={bestLabel}
		/>
		<GameCard
			title="Mini Crossword (6×6)"
			description="A double word square with a blocked corner, twelve clues, keyboard-friendly cell navigation, and a reveal panel for the full solution."
			status="Available now"
			href="{base}/crossword/"
			cta="Launch Crossword"
		/>
		<GameCard
			title="Full-Stack Leaderboard Arena"
			description="Persistent high scores, player profiles, and classic arcade progression. Coming in Project 3 with Express and MongoDB."
			status="Project 3 · Coming soon"
			href="{base}/about/"
			cta="Read the roadmap"
			available={false}
		/>
		<GameCard
			title="Real-Time Multiplayer Duel"
			description="Head-to-head rooms with instant broadcasts and presence sync, powered by WebSockets in Project 4."
			status="Project 4 · Coming soon"
			href="{base}/contact/"
			cta="Get notified"
			available={false}
		/>
	</div>
</section>

<style>
	.hero {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-6);
		margin-bottom: var(--space-8);
		padding: var(--space-6);
		background:
			linear-gradient(135deg, rgb(37 42 64 / 90%), rgb(26 29 45 / 92%)),
			var(--bg-surface);
		border: 2px solid var(--border-color);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-glow);
	}

	.hero-copy {
		flex: 1 1 24rem;
	}

	.hero h1 {
		max-width: 15ch;
		margin-bottom: var(--space-4);
	}

	.lede {
		font-size: var(--text-lg);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-top: var(--space-5);
	}

	.hero-graphic {
		flex: 0 0 auto;
		width: min(40vw, 160px);
		height: auto;
		padding: var(--space-3);
		background: var(--bg-primary);
		border: 2px solid var(--accent-primary);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
	}

	.section-heading {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-2) var(--space-5);
		margin-bottom: var(--space-5);
	}

	.section-heading h2 {
		margin: 0;
	}

	.section-heading p {
		margin: 0;
		font-size: var(--text-sm);
	}

	.game-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--space-5);
	}

	@media (max-width: 1180px) {
		.game-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 700px) {
		.game-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 520px) {
		.hero {
			padding: var(--space-5);
			gap: var(--space-4);
		}

		.hero h1 {
			max-width: none;
			font-size: 2.1rem;
		}

		.lede {
			font-size: var(--text-base);
		}

		.hero-graphic {
			width: 110px;
			padding: var(--space-2);
		}
	}
</style>
