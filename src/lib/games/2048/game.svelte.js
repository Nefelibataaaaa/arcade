import { browser } from '$app/environment';
import {
	createBoard,
	createRng,
	hasMoves,
	moveDetails,
	spawn
} from '@nefelibataaaaa/arcade-core';

import {
	BOARD_SIZE,
	ensureNextIdAbove,
	findNewCell,
	makeTile,
	toBoard
} from './tiles.js';

const SAVE_KEY = 'arcade:2048:save:v1';
const SAVE_VERSION = 1;
const DRAWS_PER_SPAWN = 2;
const MAX_SAVED_SPAWNS = 100_000;

/**
 * @typedef {{ id: number, value: number, row: number, col: number, state: string }} Tile
 */

/**
 * UI-side state for one 2048 game.
 *
 * The rules themselves live in @nefelibataaaaa/arcade-core. This class keeps
 * tile identities for animations, tracks the score and win/loss state, and
 * persists the game to localStorage.
 */
export class Game2048 {
	tiles = $state(/** @type {Tile[]} */ ([]));
	score = $state(0);
	won = $state(false);
	gameOver = $state(false);
	seed = $state('');
	spawnCount = $state(0);

	/** @type {() => number} */
	rng = Math.random;

	/**
	 * Restore the saved game, or start a new one. Call on the client only.
	 *
	 * @returns {boolean} True when a saved game was restored.
	 */
	load() {
		if (!browser) return false;

		const saved = readSavedGame();
		if (!saved) {
			this.newGame();
			return false;
		}

		this.tiles = saved.tiles;
		this.score = saved.score;
		this.won = saved.won;
		this.seed = saved.seed;
		this.spawnCount = saved.spawnCount;
		this.gameOver = !hasMoves(toBoard(this.tiles));

		ensureNextIdAbove(this.tiles);

		this.rng = createRng(this.seed);
		for (let draw = 0; draw < this.spawnCount * DRAWS_PER_SPAWN; draw += 1) this.rng();

		return true;
	}

	/**
	 * Reset the score and start over. An empty seed picks a random one.
	 *
	 * @param {string | number} [seed]
	 */
	newGame(seed) {
		const chosen =
			seed === undefined || seed === null || String(seed).trim() === ''
				? String(randomSeed())
				: String(seed).trim();

		this.rng = createRng(chosen);
		const board = createBoard(this.rng);

		/** @type {Tile[]} */
		const tiles = [];
		for (let row = 0; row < BOARD_SIZE; row += 1) {
			for (let col = 0; col < BOARD_SIZE; col += 1) {
				if (board[row][col] !== 0) {
					tiles.push(makeTile({ value: board[row][col], row, col }));
				}
			}
		}

		this.tiles = tiles;
		this.score = 0;
		this.won = false;
		this.gameOver = false;
		this.seed = chosen;
		this.spawnCount = 2;

		this.persist();
	}

	/**
	 * Slide the board in a direction. Blocked moves change nothing.
	 *
	 * @param {'up' | 'down' | 'left' | 'right'} direction
	 * @returns {{ moved: boolean, gained: number }}
	 */
	move(direction) {
		if (this.tiles.length === 0) return { moved: false, gained: 0 };

		const board = toBoard(this.tiles);
		const details = moveDetails(board, direction);

		if (!details.moved) return { moved: false, gained: 0 };

		const movedTiles = this.applyMoves(details);
		const spawnedBoard = spawn(details.board, this.rng);
		const newCell = findNewCell(details.board, spawnedBoard);

		if (newCell) {
			movedTiles.push(
				makeTile({
					value: spawnedBoard[newCell.row][newCell.col],
					row: newCell.row,
					col: newCell.col
				})
			);
			this.spawnCount += 1;
		}

		this.tiles = movedTiles.sort((a, b) => a.row - b.row || a.col - b.col);
		this.score += details.gained;

		if (!this.won && spawnedBoard.flat().some((value) => value >= 2048)) {
			this.won = true;
		}

		this.gameOver = !hasMoves(spawnedBoard);
		this.persist();

		return { moved: true, gained: details.gained };
	}

	/**
	 * @param {{
	 *   board: number[][],
	 *   moves: Array<{ from: { row: number, col: number }, to: { row: number, col: number } }>
	 * }} details
	 * @returns {Tile[]}
	 */
	applyMoves(details) {
		const key = (/** @type {number} */ row, /** @type {number} */ col) => `${row},${col}`;
		const bySource = new Map(
			details.moves.map((move) => [key(move.from.row, move.from.col), move])
		);

		/** @type {Map<string, Array<{ tile: Tile, to: { row: number, col: number } }>>} */
		const byTarget = new Map();

		for (const tile of this.tiles) {
			const move = bySource.get(key(tile.row, tile.col));
			if (!move) continue;

			const targetKey = key(move.to.row, move.to.col);
			const group = byTarget.get(targetKey) ?? [];
			group.push({ tile, to: move.to });
			byTarget.set(targetKey, group);
		}

		/** @type {Tile[]} */
		const nextTiles = [];

		for (const group of byTarget.values()) {
			const survivor = group[0];
			const { row, col } = survivor.to;
			const merged = group.length > 1;
			const value = details.board[row][col];

			nextTiles.push({ ...survivor.tile, row, col, value, state: merged ? 'merged' : 'idle' });

			if (merged) this.clearMergeStateLater(survivor.tile.id);
		}

		return nextTiles;
	}

	/** @param {number} id */
	clearMergeStateLater(id) {
		setTimeout(() => {
			const tile = this.tiles.find((candidate) => candidate.id === id);
			if (tile && tile.state === 'merged') tile.state = 'idle';
		}, 240);
	}

	persist() {
		if (!browser) return;

		const payload = {
			version: SAVE_VERSION,
			tiles: this.tiles.map(({ id, value, row, col }) => ({ id, value, row, col })),
			score: this.score,
			won: this.won,
			seed: this.seed,
			spawnCount: this.spawnCount
		};

		try {
			localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
		} catch {
			// Private browsing or a full quota should not break the game.
		}
	}
}

function randomSeed() {
	if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
		const values = new Uint32Array(1);
		crypto.getRandomValues(values);
		return values[0];
	}

	return Math.floor(Math.random() * 2 ** 32);
}

/**
 * Read and validate the saved game. Corrupt saves are ignored rather than
 * trusted, because every field feeds directly into rendering and rules.
 */
function readSavedGame() {
	try {
		const raw = localStorage.getItem(SAVE_KEY);
		if (!raw) return null;

		const saved = JSON.parse(raw);
		if (saved?.version !== SAVE_VERSION) return null;
		if (!Array.isArray(saved.tiles) || saved.tiles.length === 0 || saved.tiles.length > 16) {
			return null;
		}
		if (!Number.isFinite(saved.score) || saved.score < 0) return null;
		if (typeof saved.seed !== 'string' || saved.seed.length === 0) return null;
		if (!Number.isInteger(saved.spawnCount) || saved.spawnCount < 0) return null;
		if (saved.spawnCount > MAX_SAVED_SPAWNS) return null;

		const occupied = new Set();
		/** @type {Tile[]} */
		const tiles = [];

		for (const tile of saved.tiles) {
			if (!Number.isInteger(tile?.id) || tile.id < 1) return null;
			if (!Number.isInteger(tile?.value) || tile.value < 2) return null;
			if ((tile.value & (tile.value - 1)) !== 0) return null;
			if (!Number.isInteger(tile?.row) || tile.row < 0 || tile.row >= BOARD_SIZE) return null;
			if (!Number.isInteger(tile?.col) || tile.col < 0 || tile.col >= BOARD_SIZE) return null;

			const position = `${tile.row},${tile.col}`;
			if (occupied.has(position)) return null;
			occupied.add(position);

			tiles.push({ id: tile.id, value: tile.value, row: tile.row, col: tile.col, state: 'idle' });
		}

		const board = toBoard(tiles);

		return {
			tiles,
			score: Math.floor(saved.score),
			won: Boolean(saved.won) || board.flat().some((value) => value >= 2048),
			seed: saved.seed,
			spawnCount: saved.spawnCount
		};
	} catch {
		return null;
	}
}
