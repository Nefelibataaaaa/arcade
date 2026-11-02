<script>
	import { slide } from 'svelte/transition';

	import CrosswordBoard from '$lib/components/CrosswordBoard.svelte';
	import CrosswordClues from '$lib/components/CrosswordClues.svelte';
	import SolutionPanel from '$lib/components/SolutionPanel.svelte';
	import {
		ACROSS_CLUES,
		CELLS,
		DOWN_CLUES,
		SOLUTION_ROWS,
		TOTAL_LETTERS
	} from '$lib/data/crossword.js';

	let letters = $state(Array(CELLS.length).fill(''));
	let showSolution = $state(false);

	const filled = $derived(
		CELLS.reduce((count, cell) => (letters[cell.index] ? count + 1 : count), 0)
	);
	const correct = $derived(
		CELLS.reduce(
			(count, cell) => (letters[cell.index] === cell.solution ? count + 1 : count),
			0
		)
	);
	const solved = $derived(filled === TOTAL_LETTERS && correct === TOTAL_LETTERS);

	/**
	 * @param {number} index
	 * @param {string} value
	 */
	function handleLetter(index, value) {
		if (letters[index] === value) return;
		letters = letters.map((letter, position) => (position === index ? value : letter));
	}

	function clearGrid() {
		letters = Array(CELLS.length).fill('');
	}
</script>

<svelte:head>
	<title>Mini Crossword — Cheney Gong's Arcade</title>
	<meta
		name="description"
		content="Play the 6x6 mini crossword: click or tab into any open square, read the Across and Down clues, and reveal the solution from the keyboard or a touchscreen."
	/>
</svelte:head>

<header class="page-header">
	<p class="eyebrow">Cabinet 02 · Word puzzle</p>
	<h1>6×6 Mini Crossword</h1>
	<p>
		Tab or click into any open square to type a letter. Arrow keys move around the grid and a
		correct letter automatically advances to the next square. The striped square is blocked.
	</p>
</header>

<div class="puzzle-layout">
	<section aria-label="Crossword grid">
		<CrosswordBoard {letters} onletter={handleLetter} />
	</section>

	<section class="clues-panel" aria-label="Crossword clues">
		<CrosswordClues across={ACROSS_CLUES} down={DOWN_CLUES} />
	</section>
</div>

<div class="puzzle-toolbar">
	<p class="progress" aria-live="polite">
		{filled} of {TOTAL_LETTERS} letters filled{#if solved} — solved!{/if}
	</p>

	<div class="actions">
		<button type="button" class="btn btn-ghost" onclick={clearGrid}>Clear grid</button>
		<button
			type="button"
			class="btn btn-secondary"
			aria-expanded={showSolution}
			aria-controls="solution-panel"
			onclick={() => (showSolution = !showSolution)}
		>
			{showSolution ? 'Hide solution' : 'Reveal solution'}
		</button>
	</div>
</div>

{#if showSolution}
	<div id="solution-panel" class="solution-wrap" transition:slide={{ duration: 240 }}>
		<SolutionPanel rows={SOLUTION_ROWS} />
	</div>
{/if}

<details class="hint-box">
	<summary>Letter hints by clue</summary>
	<p>
		1A/6D starts with <strong>A</strong> · 6A/1D starts with <strong>A</strong> · 7A/2D starts
		with <strong>S</strong> · 8A/3D starts with <strong>H</strong> · 9A/4D starts with
		<strong>E</strong> · 10A/5D starts with <strong>S</strong>.
	</p>
</details>

<section class="panel source-note" aria-labelledby="source-heading">
	<h2 id="source-heading">About This Puzzle</h2>
	<p>
		The grid is adapted from a 6×6 double word square first published as “Answer to Word Square”
		in <em>The Sun</em> (Auckland, New Zealand), 18 June 1927, page 26, and digitised by Papers
		Past at the National Library of New Zealand. The original leading W is blocked here, leaving
		the equally valid ASHES; all twelve clues were written for this project.
	</p>
</section>

<style>
	.puzzle-layout {
		display: grid;
		grid-template-columns: minmax(280px, 420px) 1fr;
		gap: var(--space-6);
		align-items: start;
	}

	.clues-panel {
		padding: var(--space-5);
		background: var(--bg-surface);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
	}

	.puzzle-toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3) var(--space-5);
		margin-top: var(--space-5);
	}

	.progress {
		margin: 0;
		color: var(--text-secondary);
		font-size: var(--text-sm);
		font-variant-numeric: tabular-nums;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}

	.solution-wrap {
		margin-top: var(--space-5);
	}

	.hint-box {
		margin-top: var(--space-5);
		padding: var(--space-4) var(--space-5);
		background: var(--bg-surface);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
	}

	.hint-box summary {
		display: inline-flex;
		align-items: center;
		min-height: var(--touch-target);
		color: var(--accent-cyan);
		font-weight: 650;
		cursor: pointer;
	}

	.hint-box p {
		margin: var(--space-2) 0 0;
		font-size: var(--text-sm);
	}

	.source-note {
		margin-top: var(--space-5);
	}

	.source-note h2 {
		margin-bottom: var(--space-2);
		font-size: var(--text-lg);
	}

	.source-note p {
		margin: 0;
		font-size: var(--text-sm);
	}

	@media (max-width: 860px) {
		.puzzle-layout {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 420px) {
		.clues-panel {
			padding: var(--space-4);
		}
	}
</style>
