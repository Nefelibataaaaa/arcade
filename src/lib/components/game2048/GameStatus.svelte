<script>
	import { fly } from 'svelte/transition';

	let { won = false, gameOver = false, score = 0, onrestart = () => {} } = $props();

	const scoreLabel = $derived(score.toLocaleString('en-US'));
</script>

{#if gameOver}
	<div
		class="status lost"
		role="status"
		aria-live="polite"
		transition:fly={{ y: -8, duration: 200 }}
	>
		<p><strong>Game over.</strong> Final score: {scoreLabel}.</p>
		<button class="btn btn-secondary" type="button" onclick={onrestart}>
			Start a new game
		</button>
	</div>
{:else if won}
	<div
		class="status won"
		role="status"
		aria-live="polite"
		transition:fly={{ y: -8, duration: 200 }}
	>
		<p><strong>You reached 2048!</strong> Keep going for a higher score.</p>
	</div>
{/if}

<style>
	.status {
		padding: var(--space-4);
		background: var(--bg-surface);
		border: 1px solid var(--border-color);
		border-left: 4px solid var(--accent-primary);
		border-radius: var(--radius-md);
	}

	.status.lost {
		border-left-color: var(--danger);
	}

	.status.won {
		border-left-color: var(--success);
	}

	.status p {
		margin: 0;
		color: var(--text-primary);
	}

	.status button {
		margin-top: var(--space-3);
	}
</style>
