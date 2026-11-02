<script>
	import { onMount } from 'svelte';

	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { loadBestScores } from '$lib/state/scores.svelte.js';

	let { children } = $props();

	onMount(loadBestScores);
</script>

<a class="skip-link" href="#main-content">Skip to main content</a>

<NavBar />

<main id="main-content" tabindex="-1">
	{@render children()}
</main>

<SiteFooter />
