<script>
	import { CELLS, CROSSWORD_SIZE } from '$lib/data/crossword.js';

	let { letters = [], onletter = () => {} } = $props();

	let boardElement = $state(null);

	/** @param {number} index */
	function focusCell(index) {
		const input = boardElement?.querySelector(`input[data-cell="${index}"]`);
		if (input instanceof HTMLInputElement) input.focus();
	}

	/**
	 * @param {number} row
	 * @param {number} col
	 */
	function cellAt(row, col) {
		if (row < 0 || row >= CROSSWORD_SIZE || col < 0 || col >= CROSSWORD_SIZE) return null;
		return CELLS[row * CROSSWORD_SIZE + col];
	}

	/** @param {number} index */
	function nextOpenCell(index) {
		for (let cursor = index + 1; cursor < CELLS.length; cursor += 1) {
			if (!CELLS[cursor].blocked) return CELLS[cursor].index;
		}
		return null;
	}

	/** @param {number} index */
	function previousOpenCell(index) {
		for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
			if (!CELLS[cursor].blocked) return CELLS[cursor].index;
		}
		return null;
	}

	/**
	 * @param {InputEvent & { currentTarget: HTMLInputElement }} event
	 * @param {number} index
	 */
	function handleInput(event, index) {
		const input = event.currentTarget;
		const value = input.value.replace(/[^a-z]/gi, '').slice(-1).toUpperCase();

		input.value = value;
		onletter(index, value);

		if (value) {
			const next = nextOpenCell(index);
			if (next !== null) focusCell(next);
		}
	}

	/**
	 * @param {KeyboardEvent & { currentTarget: HTMLInputElement }} event
	 * @param {{ index: number, row: number, col: number }} cell
	 */
	function handleKeydown(event, cell) {
		if (event.key === 'Backspace' && event.currentTarget.value === '') {
			const previous = previousOpenCell(cell.index);
			if (previous !== null) {
				event.preventDefault();
				onletter(previous, '');
				focusCell(previous);
			}
			return;
		}

		/** @type {Record<string, [number, number]>} */
		const directions = {
			ArrowUp: [-1, 0],
			ArrowDown: [1, 0],
			ArrowLeft: [0, -1],
			ArrowRight: [0, 1]
		};

		const delta = directions[event.key];
		if (!delta) return;

		let row = cell.row + delta[0];
		let col = cell.col + delta[1];

		while (row >= 0 && row < CROSSWORD_SIZE && col >= 0 && col < CROSSWORD_SIZE) {
			const target = cellAt(row, col);
			if (target && !target.blocked) {
				event.preventDefault();
				focusCell(target.index);
				return;
			}
			row += delta[0];
			col += delta[1];
		}
	}
</script>

<div
	class="crossword-board"
	role="group"
	aria-label="6 by 6 crossword puzzle"
	bind:this={boardElement}
>
	{#each CELLS as cell (cell.index)}
		{#if cell.blocked}
			<div class="cell blocked" aria-hidden="true"></div>
		{:else}
			<div class="cell" class:filled={Boolean(letters[cell.index])}>
				{#if cell.number}
					<span class="cell-number" aria-hidden="true">{cell.number}</span>
				{/if}
				<input
					class="cell-input"
					type="text"
					inputmode="text"
					autocapitalize="characters"
					autocomplete="off"
					spellcheck="false"
					maxlength="1"
					enterkeyhint="next"
					value={letters[cell.index] ?? ''}
					data-cell={cell.index}
					aria-label={cell.label}
					oninput={(event) => handleInput(event, cell.index)}
					onkeydown={(event) => handleKeydown(event, cell)}
				/>
			</div>
		{/if}
	{/each}
</div>

<style>
	.crossword-board {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 4px;
		width: 100%;
		max-width: 420px;
		margin: 0 auto;
		padding: 6px;
		background: var(--border-color);
		border: 3px solid var(--accent-primary);
		border-radius: var(--radius-md);
	}

	.cell {
		position: relative;
		aspect-ratio: 1 / 1;
		min-width: var(--touch-target);
		min-height: var(--touch-target);
		background: var(--bg-surface);
		border-radius: 2px;
		overflow: hidden;
	}

	.cell.filled {
		background: var(--bg-elevated);
	}

	.cell.blocked {
		background-color: var(--blocked-bg);
		background-image: repeating-linear-gradient(
			45deg,
			var(--blocked-bg),
			var(--blocked-bg) 6px,
			var(--blocked-stripe) 6px,
			var(--blocked-stripe) 12px
		);
	}

	.cell-number {
		position: absolute;
		top: 2px;
		left: 4px;
		z-index: 1;
		color: var(--accent-cyan);
		font-size: 0.7rem;
		font-weight: 700;
		line-height: 1;
		pointer-events: none;
	}

	.cell-input {
		width: 100%;
		height: 100%;
		min-width: var(--touch-target);
		min-height: var(--touch-target);
		padding-top: var(--space-2);
		background: transparent;
		border: 0;
		border-radius: 2px;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: clamp(1.1rem, 4vw, 1.5rem);
		font-weight: 700;
		text-align: center;
		text-transform: uppercase;
	}

	.cell-input:focus {
		background: var(--bg-elevated);
	}

	@media (max-width: 420px) {
		.crossword-board {
			gap: 2px;
			padding: 4px;
			border-width: 2px;
		}
	}
</style>
