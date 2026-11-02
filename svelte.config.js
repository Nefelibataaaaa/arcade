import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// GitHub project Pages are served from /<repository-name>/. Local development
// and non-Pages hosts use an empty base path. The deploy workflow sets BASE_PATH.
const base = process.env.BASE_PATH ?? '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: { base },
		prerender: { handleHttpError: 'warn' }
	}
};

export default config;
