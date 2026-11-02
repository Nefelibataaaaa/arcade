<script>
	import { base } from '$app/paths';
	import { page } from '$app/state';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{page.status} — Cheney Gong's Arcade</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<header class="page-header">
	<p class="eyebrow">Error {page.status}</p>
	<h1>{notFound ? 'That cabinet is empty' : 'Something went wrong'}</h1>
	<p>
		{notFound
			? 'The page you asked for is not part of the arcade. The lobby is still open.'
			: 'The arcade hit an unexpected problem. Please head back to the lobby and try again.'}
	</p>
	<a class="btn btn-primary" href="{base}/">Back to the arcade</a>
</header>
