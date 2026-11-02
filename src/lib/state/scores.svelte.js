import { browser } from '$app/environment';

const STORAGE_KEY = 'arcade:best-scores:v1';

/**
 * Shared best-score state. The landing page reads it to show a personal best on
 * the 2048 card, and the 2048 page writes to it after each scoring move.
 */
export const bestScores = $state({
	arcade2048: 0
});

let loaded = false;

/**
 * Hydrate from localStorage once, on the client. Safe to call from multiple
 * components: later calls are no-ops.
 */
export function loadBestScores() {
	if (!browser || loaded) return;
	loaded = true;

	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return;

		const saved = JSON.parse(raw);
		if (Number.isFinite(saved?.arcade2048) && saved.arcade2048 >= 0) {
			bestScores.arcade2048 = Math.floor(saved.arcade2048);
		}
	} catch {
		// A corrupt or unavailable store should never stop the game from loading.
	}
}

/**
 * Raise the saved best score when `score` beats it.
 *
 * @param {number} score
 */
export function recordBestScore(score) {
	if (!Number.isFinite(score) || score <= bestScores.arcade2048) return;

	bestScores.arcade2048 = Math.floor(score);

	if (!browser) return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ arcade2048: bestScores.arcade2048 }));
	} catch {
		// Storage can be full or disabled; the in-memory best still works.
	}
}
