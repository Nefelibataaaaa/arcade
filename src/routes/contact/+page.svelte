<script>
	import ContactCard from '$lib/components/ContactCard.svelte';
</script>

<svelte:head>
	<title>Contact — Cheney Gong's Arcade</title>
	<meta
		name="description"
		content="Contact Cheney Gong by email or GitHub for internship inquiries, new-grad roles, and backend or web engineering projects."
	/>
</svelte:head>

<header class="page-header">
	<p class="eyebrow">Say hello</p>
	<h1>Contact Cheney Gong</h1>
	<p>
		I am open to conversations about internships, new-grad roles, and backend or web engineering
		projects. Email is the fastest way to reach me — I typically reply within a day or two.
	</p>
</header>

<section aria-labelledby="channels-heading">
	<h2 id="channels-heading">Find Me Online</h2>

	<div class="contact-grid">
		<ContactCard
			icon="email"
			title="Email"
			description="Best for internship inquiries, project questions, or anything that needs a paper trail."
			href="mailto:gong.can@northeastern.edu"
			linkLabel="gong.can@northeastern.edu"
		/>
		<ContactCard
			icon="github"
			title="GitHub"
			description="Course projects and personal builds, including the source for this arcade site."
			href="https://github.com/Nefelibataaaaa"
			linkLabel="github.com/Nefelibataaaaa"
		/>
	</div>
</section>

<section class="panel location" aria-labelledby="location-heading">
	<h2 id="location-heading">Where I Am</h2>
	<p>
		Based in Seattle, Washington, and studying at Northeastern University. I am comfortable
		working remotely across US time zones and happy to meet in person around the Seattle area.
	</p>
</section>

<style>
	.contact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
		gap: var(--space-5);
	}

	.location {
		margin-top: var(--space-6);
	}

	.location p {
		margin-bottom: 0;
	}
</style>
