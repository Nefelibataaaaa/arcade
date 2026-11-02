<script>
	import Timeline from '$lib/components/Timeline.svelte';

	const experience = [
		{
			title: 'M.S. in Computer Science — Northeastern University (Seattle, WA)',
			description:
				'Focusing on full-stack web engineering, distributed systems, and computer vision.'
		},
		{
			title: 'Data Resource & Engineering Intern — iFLYTEK Corp.',
			description:
				'Designed and automated high-throughput ETL data pipelines processing over 100,000 structured records.'
		},
		{
			title: 'B.S. in Artificial Intelligence — Anhui University',
			description:
				'Served as an Undergraduate Research Assistant in the Bioinformatics & Data Mining Laboratory.'
		}
	];

	const roadmap = [
		'Project 3 — a leaderboard arena with Express, MongoDB, and player accounts.',
		'Project 4 — a real-time multiplayer duel backed by WebSockets.',
		'Smaller improvements — more crossword puzzles and a shared high-score board.'
	];
</script>

<svelte:head>
	<title>About — Cheney Gong's Arcade</title>
	<meta
		name="description"
		content="About Cheney Gong — M.S. Computer Science student at Northeastern University in Seattle, with a B.S. in Artificial Intelligence and backend engineering experience."
	/>
</svelte:head>

<header class="page-header">
	<p class="eyebrow">Player profile</p>
	<h1>About Cheney Gong</h1>
</header>

<article class="panel profile">
	<p>
		I am a Master of Science in Computer Science graduate student at Northeastern University in
		Seattle, with a Bachelor of Science in Artificial Intelligence from Anhui University. I enjoy
		building resilient backend architectures, autonomous AI agent platforms, and accessible web
		interfaces.
	</p>

	<h2>Education &amp; Experience</h2>
	<Timeline items={experience} />
</article>

<section class="panel" aria-labelledby="site-heading">
	<h2 id="site-heading">How This Arcade Is Built</h2>
	<p>
		The arcade is a SvelteKit application written with Svelte 5 runes. The 2048 game rules live in
		a separate npm package, <code>@nefelibataaaaa/arcade-core</code>, so the rules can be tested in
		plain Node without a browser. The site itself keeps only presentation, input handling, and
		persistence.
	</p>
	<p>
		The visuals use one shared token system for colour, type, spacing, and motion, with keyboard
		focus, high-contrast tile colours, and responsive layouts from 320px phone screens to wide
		displays.
	</p>
</section>

<section class="panel" aria-labelledby="roadmap-heading">
	<h2 id="roadmap-heading">Roadmap</h2>
	<ul class="roadmap">
		{#each roadmap as item (item)}
			<li>{item}</li>
		{/each}
	</ul>
</section>

<style>
	.profile {
		margin-bottom: var(--space-5);
	}

	.profile h2 {
		margin-top: var(--space-6);
	}

	section.panel {
		margin-bottom: var(--space-5);
	}

	code {
		padding: 0.1em 0.35em;
		background: var(--bg-inset);
		color: var(--accent-cyan);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: 0.9em;
	}

	.roadmap {
		margin: 0;
		padding-left: var(--space-5);
	}

	.roadmap li {
		margin-bottom: var(--space-2);
	}
</style>
