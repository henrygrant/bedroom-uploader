import { appendFileSync } from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, url }) {
	const fn = url.searchParams.get('fn');
	for await (const chunk of request.body) {
		appendFileSync(fn, chunk);
	}
	return new Response(String('kk'));
}
