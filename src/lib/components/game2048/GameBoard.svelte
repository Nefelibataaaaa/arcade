<script>
	import { describeBoard } from '$lib/games/2048/tiles.js';

	import Tile from './Tile.svelte';

	let { tiles = [], onmove = () => {} } = $props();

	const gridCells = Array.from({ length: 16 }, (_, index) => index);
	const boardLabel = $derived(`2048 board. ${describeBoard(tiles)}`);

	/** @type {{ x: number, y: number } | null} */
	let touchStart = null;

	/** @param {TouchEvent} event */
	function handleTouchStart(event) {
		const touch = event.touches[0];
		if (!touch) return;
		touchStart = { x: touch.clientX, y: touch.clientY };
	}

	/** @param {TouchEvent} event */
	function handleTouchEnd(event) {
		if (!touchStart) return;

		const touch = event.changedTouches[0];
		if (!touch) {
			touchStart = null;
			return;
		}

		const deltaX = touch.clientX - touchStart.x;
		const deltaY = touch.clientY - touchStart.y;
		touchStart = null;

		const threshold = 24;
		if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) return;

		onmove(
			Math.abs(deltaX) >= Math.abs(deltaY)
				? deltaX > 0
					? 'right'
					: 'left'
				: deltaY > 0
					? 'down'
					: 'up'
		);
	}
</script>

<div
	class="board"
	role="group"
	aria-label={boardLabel}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<div class="board-inner">
		<div class="grid" aria-hidden="true">
			{#each gridCells as cell (cell)}
				<div class="cell"></div>
			{/each}
		</div>

		<div class="tile-layer" aria-hidden="true">
			{#each tiles as tile (tile.id)}
				<Tile {tile} />
			{/each}
		</div>
	</div>
</div>

<style>
	.board {
		--board-gap: clamp(6px, 1.6vw, 12px);

		width: 100%;
		max-width: 32rem;
		margin: 0 auto;
		padding: var(--board-gap);
		aspect-ratio: 1 / 1;
		background: var(--bg-inset);
		border: 2px solid var(--border-color);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-glow);
		touch-action: none;
		user-select: none;
	}

	.board-inner {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		gap: var(--board-gap);
		width: 100%;
		height: 100%;
	}

	.cell {
		background: rgb(255 255 255 / 4%);
		border-radius: var(--radius-sm);
	}

	.tile-layer {
		position: absolute;
		inset: 0;
	}
</style>
