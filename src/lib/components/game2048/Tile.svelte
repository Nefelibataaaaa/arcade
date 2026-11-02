<script>
	import { scale } from 'svelte/transition';

	import { tileTone } from '$lib/games/2048/tiles.js';

	let { tile } = $props();

	const tone = $derived(tileTone(tile.value));
	const digits = $derived(String(tile.value).length);
</script>

<div class="tile-slot" style:--row={tile.row} style:--col={tile.col}>
	<div
		class="tile {tone}"
		class:merged={tile.state === 'merged'}
		class:three-digits={digits === 3}
		class:four-digits={digits >= 4}
		in:scale={{ duration: 160, start: 0.4 }}
		out:scale={{ duration: 100 }}
	>
		<span>{tile.value}</span>
	</div>
</div>

<style>
	.tile-slot {
		position: absolute;
		top: calc(var(--row) * ((100% - 3 * var(--board-gap)) / 4 + var(--board-gap)));
		left: calc(var(--col) * ((100% - 3 * var(--board-gap)) / 4 + var(--board-gap)));
		width: calc((100% - 3 * var(--board-gap)) / 4);
		height: calc((100% - 3 * var(--board-gap)) / 4);
		transition:
			top var(--duration-fast) var(--ease-out),
			left var(--duration-fast) var(--ease-out);
	}

	.tile {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		background: var(--tile-bg);
		color: var(--tile-fg);
		border-radius: var(--radius-sm);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 28%),
			0 2px 8px rgb(0 0 0 / 25%);
		font-size: clamp(1.05rem, 4.2vw + 0.35rem, 2rem);
		font-weight: 800;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.three-digits {
		font-size: clamp(0.95rem, 3.6vw + 0.25rem, 1.7rem);
	}

	.four-digits {
		font-size: clamp(0.85rem, 3.1vw + 0.2rem, 1.45rem);
	}

	.tile-2 {
		--tile-bg: var(--tile-2-bg);
		--tile-fg: var(--tile-2-fg);
	}

	.tile-4 {
		--tile-bg: var(--tile-4-bg);
		--tile-fg: var(--tile-4-fg);
	}

	.tile-8 {
		--tile-bg: var(--tile-8-bg);
		--tile-fg: var(--tile-8-fg);
	}

	.tile-16 {
		--tile-bg: var(--tile-16-bg);
		--tile-fg: var(--tile-16-fg);
	}

	.tile-32 {
		--tile-bg: var(--tile-32-bg);
		--tile-fg: var(--tile-32-fg);
	}

	.tile-64 {
		--tile-bg: var(--tile-64-bg);
		--tile-fg: var(--tile-64-fg);
	}

	.tile-128 {
		--tile-bg: var(--tile-128-bg);
		--tile-fg: var(--tile-128-fg);
	}

	.tile-256 {
		--tile-bg: var(--tile-256-bg);
		--tile-fg: var(--tile-256-fg);
	}

	.tile-512 {
		--tile-bg: var(--tile-512-bg);
		--tile-fg: var(--tile-512-fg);
	}

	.tile-1024 {
		--tile-bg: var(--tile-1024-bg);
		--tile-fg: var(--tile-1024-fg);
	}

	.tile-2048 {
		--tile-bg: var(--tile-2048-bg);
		--tile-fg: var(--tile-2048-fg);
	}

	.tile-super {
		--tile-bg: var(--tile-super-bg);
		--tile-fg: var(--tile-super-fg);
		box-shadow:
			inset 0 0 0 2px var(--accent-cyan),
			0 0 18px rgb(77 238 234 / 35%);
	}

	.merged {
		animation: tile-pop 240ms var(--ease-out);
	}

	@keyframes tile-pop {
		0% {
			transform: scale(1);
		}
		45% {
			transform: scale(1.12);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
