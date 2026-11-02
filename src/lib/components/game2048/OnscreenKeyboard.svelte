<script>
	let { onmove = () => {} } = $props();

	const buttons = [
		{ direction: 'up', label: 'Move tiles up', glyph: '↑', area: 'up' },
		{ direction: 'left', label: 'Move tiles left', glyph: '←', area: 'left' },
		{ direction: 'down', label: 'Move tiles down', glyph: '↓', area: 'down' },
		{ direction: 'right', label: 'Move tiles right', glyph: '→', area: 'right' }
	];
</script>

<div class="keyboard" role="group" aria-label="On-screen movement controls">
	{#each buttons as button (button.direction)}
		<button
			class="key {button.area}"
			type="button"
			aria-label={button.label}
			onclick={() => onmove(button.direction)}
		>
			<span aria-hidden="true">{button.glyph}</span>
		</button>
	{/each}
</div>

<style>
	.keyboard {
		display: none;
	}

	.key {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		background: var(--bg-elevated);
		color: var(--text-primary);
		border: 2px solid var(--border-strong);
		border-radius: var(--radius-sm);
		font-size: var(--text-lg);
		line-height: 1;
		touch-action: manipulation;
	}

	.key:hover {
		border-color: var(--accent-primary);
		color: var(--accent-hover);
	}

	.up {
		grid-area: up;
	}

	.left {
		grid-area: left;
	}

	.down {
		grid-area: down;
	}

	.right {
		grid-area: right;
	}

	@media (max-width: 640px) {
		.keyboard {
			display: grid;
			grid-template-columns: repeat(3, 3rem);
			grid-template-rows: repeat(2, 3rem);
			grid-template-areas:
				'. up .'
				'left down right';
			gap: var(--space-2);
			justify-content: center;
			margin-top: var(--space-2);
		}
	}
</style>
