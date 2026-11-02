export const BOARD_SIZE = 4;

let nextTileId = 1;

/**
 * @param {{ value: number, row: number, col: number, state?: string }} tile
 * @returns {{ id: number, value: number, row: number, col: number, state: string }}
 */
export function makeTile({ value, row, col, state = 'idle' }) {
	return { id: nextTileId++, value, row, col, state };
}

/**
 * Keep new ids unique after loading tiles whose ids came from a previous visit.
 *
 * @param {Array<{ id: number }>} tiles
 */
export function ensureNextIdAbove(tiles) {
	const highest = tiles.reduce((max, tile) => Math.max(max, tile.id), 0);
	if (highest >= nextTileId) nextTileId = highest + 1;
}

/**
 * @param {Array<{ value: number, row: number, col: number }>} tiles
 * @returns {number[][]}
 */
export function toBoard(tiles) {
	const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

	for (const tile of tiles) {
		board[tile.row][tile.col] = tile.value;
	}

	return board;
}

/**
 * Find the cell that appeared between two boards.
 *
 * @param {number[][]} before
 * @param {number[][]} after
 * @returns {{ row: number, col: number } | null}
 */
export function findNewCell(before, after) {
	for (let row = 0; row < BOARD_SIZE; row += 1) {
		for (let col = 0; col < BOARD_SIZE; col += 1) {
			if (before[row][col] === 0 && after[row][col] !== 0) {
				return { row, col };
			}
		}
	}

	return null;
}

/**
 * The tile-2 ... tile-2048 classes form the 11-step colour ramp; anything
 * larger shares the deepest "super" colour.
 *
 * @param {number} value
 * @returns {string}
 */
export function tileTone(value) {
	return value <= 2048 ? `tile-${value}` : 'tile-super';
}

/**
 * A compact board description for a screen reader label.
 *
 * @param {Array<{ value: number, row: number, col: number }>} tiles
 * @returns {string}
 */
export function describeBoard(tiles) {
	const board = toBoard(tiles);

	return board
		.map(
			(row, index) =>
				`Row ${index + 1}: ${row.map((value) => (value === 0 ? 'empty' : value)).join(', ')}.`
		)
		.join(' ');
}
