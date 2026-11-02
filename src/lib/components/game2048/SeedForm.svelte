<script>
	let { seed = '', onstart = () => {} } = $props();

	let draft = $state('');

	/** @param {SubmitEvent} event */
	function handleSubmit(event) {
		event.preventDefault();
		onstart(draft);
		draft = '';
	}
</script>

<form class="seed-form" onsubmit={handleSubmit}>
	<h2>Seeded game</h2>
	<p id="seed-help" class="help">
		The same seed and the same moves always produce the same spawns. Leave it blank for a
		random seed.
	</p>

	<label for="seed-input">Seed</label>
	<div class="seed-row">
		<input
			id="seed-input"
			type="text"
			autocomplete="off"
			spellcheck="false"
			placeholder="e.g. 2026"
			bind:value={draft}
			aria-describedby="seed-help"
		/>
		<button class="btn btn-ghost" type="submit">Start</button>
	</div>

	<p class="current">
		Current seed: <code>{seed}</code>
	</p>
</form>

<style>
	.seed-form {
		padding: var(--space-5);
		background: var(--bg-surface);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
	}

	h2 {
		margin-bottom: var(--space-2);
		font-size: var(--text-lg);
	}

	.help {
		margin-bottom: var(--space-4);
		font-size: var(--text-sm);
	}

	label {
		display: block;
		margin-bottom: var(--space-1);
		color: var(--text-primary);
		font-size: var(--text-sm);
		font-weight: 700;
	}

	.seed-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	input {
		flex: 1 1 8rem;
		min-width: 0;
		min-height: var(--touch-target);
		padding: var(--space-2) var(--space-3);
		background: var(--bg-inset);
		color: var(--text-primary);
		border: 2px solid var(--border-color);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}

	input::placeholder {
		color: var(--text-muted);
	}

	input:focus-visible {
		border-color: var(--accent-cyan);
	}

	.current {
		margin: var(--space-3) 0 0;
		color: var(--text-muted);
		font-size: var(--text-xs);
	}

	code {
		color: var(--accent-cyan);
		font-family: var(--font-mono);
		overflow-wrap: anywhere;
	}
</style>
