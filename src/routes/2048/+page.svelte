<script>
	import { onMount } from 'svelte';

	import GameBoard from '$lib/components/game2048/GameBoard.svelte';
	import GameStatus from '$lib/components/game2048/GameStatus.svelte';
	import NewGameButton from '$lib/components/game2048/NewGameButton.svelte';
	import OnscreenKeyboard from '$lib/components/game2048/OnscreenKeyboard.svelte';
	import ScoreBoard from '$lib/components/game2048/ScoreBoard.svelte';
	import SeedForm from '$lib/components/game2048/SeedForm.svelte';
	import { Game2048 } from '$lib/games/2048/game.svelte.js';
	import {
		bestScores,
		loadBestScores,
		recordBestScore
	} from '$lib/state/scores.svelte.js';

	const game = new Game2048();

	let ready = $state(false);
	const best = $derived(bestScores.arcade2048);

	const KEY_DIRECTIONS = {
		ArrowUp: 'up',
		ArrowDown: 'down',
		ArrowLeft: 'left',
		ArrowRight: 'right',
		w: 'up',
		a: 'left',
		s: 'down',
		d: 'right'
	};

	onMount(() => {
		loadBestScores();
		game.load();

		if (game.score > bestScores.arcade2048) recordBestScore(game.score);

		ready = true;
	});

	/** @param {'up' | 'down' | 'left' | 'right'} direction */
	function makeMove(direction) {
		if (!ready) return;

		const result = game.move(direction);
		if (result.moved && game.score > bestScores.arcade2048) {
			recordBestScore(game.score);
		}
	}

	function startNewGame() {
		game.newGame();
	}

	/** @param {string} seed */
	function startSeededGame(seed) {
		game.newGame(seed);
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;

		const target = event.target;
		if (target instanceof HTMLElement) {
			const tag = target.tagName;
			if (
				target.isContentEditable ||
				tag === 'INPUT' ||
				tag === 'TEXTAREA' ||
				tag === 'SELECT'
			) {
				return;
			}
		}

		const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
		const direction = KEY_DIRECTIONS[key];
		if (!direction) return;

		event.preventDefault();
		makeMove(direction);
	}
</script>

<svelte:head>
	<title>2048 — Cheney Gong's Arcade</title>
	<meta
		name="description"
		content="Play 2048 with keyboard, swipe, or on-screen controls. Merge tiles, chase a high score, and continue past 2048."
	/>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<header class="page-header">
	<p class="eyebrow">Cabinet 01 · Sliding puzzle</p>
	<h1>2048</h1>
	<p>
		Slide every tile with the arrow keys or W A S D. Equal neighbours merge once, so 2 2 2 2
		becomes 4 4 — never 8. Reach 2048, then keep going. On a phone, swipe the board or use the
		on-screen pad.
	</p>
</header>

{#if ready}
	<div class="game-layout">
		<section class="play-area" aria-label="2048 game">
			<ScoreBoard score={game.score} best={best} />
			<p class="visually-hidden" aria-live="polite">Score {game.score}. Best {best}.</p>

			<GameBoard tiles={game.tiles} onmove={makeMove} />

			<GameStatus
				won={game.won}
				gameOver={game.gameOver}
				score={game.score}
				onrestart={startNewGame}
			/>

			<OnscreenKeyboard onmove={makeMove} />
		</section>

		<aside class="side-panel" aria-label="Game controls and instructions">
			<NewGameButton onnewgame={startNewGame} />

			<SeedForm seed={game.seed} onstart={startSeededGame} />

			<section class="how-to panel" aria-labelledby="how-heading">
				<h2 id="how-heading">How to play</h2>
				<ul>
					<li>Arrow keys or W A S D move every tile in that direction.</li>
					<li>Two equal tiles merge into their sum, once per move.</li>
					<li>Each merge adds the new tile's value to your score.</li>
					<li>A blocked move does not spawn a new tile.</li>
					<li>Reaching 2048 wins the round — the board stays open for more.</li>
					<li>The round ends when no tile can move or merge.</li>
				</ul>
				<p class="save-note">
					Your current board and best score are saved in this browser, so closing the tab does
					not lose your progress.
				</p>
				<p class="package-note">
					Game rules come from the
					<a
						href="https://www.npmjs.com/package/@nefelibataaaaa/arcade-core"
						rel="noreferrer">@nefelibataaaaa/arcade-core</a
					>
					npm package.
				</p>
			</section>
		</aside>
	</div>
{:else}
	<p class="loading" role="status">Setting up the board…</p>
{/if}

<style>
	.game-layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(16rem, 19rem);
		gap: var(--space-6);
		align-items: start;
	}

	.play-area {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
		max-width: 32rem;
		margin: 0 auto;
	}

	.page-header p {
		max-width: 62ch;
		font-size: var(--text-base);
	}

	.side-panel {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.how-to h2 {
		margin-bottom: var(--space-3);
		font-size: var(--text-lg);
	}

	.how-to ul {
		margin: 0 0 var(--space-4);
		padding-left: var(--space-5);
	}

	.how-to li {
		margin-bottom: var(--space-2);
		font-size: var(--text-sm);
	}

	.how-to p {
		margin-bottom: var(--space-3);
	}

	.save-note,
	.package-note {
		color: var(--text-muted);
		font-size: var(--text-xs);
	}

	.package-note {
		margin-bottom: 0;
	}

	.loading {
		padding: var(--space-6);
		text-align: center;
		font-size: var(--text-lg);
	}

	@media (max-width: 900px) {
		.game-layout {
			grid-template-columns: 1fr;
		}

		.side-panel {
			width: 100%;
			max-width: 32rem;
			margin: 0 auto;
		}
	}
</style>
