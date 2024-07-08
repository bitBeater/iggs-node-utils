import { readFileSync, rmSync } from 'fs';
import { createServer } from 'http';
import { join } from 'path';
import { exists } from '../src/fs/files';
import { downloadOnFs, httpRequest } from '../src/http';

it('test httpRequest', async () => {
	const server = createServer((_req, resp) => resp.end('Hello World\n')).listen(1337);

	const resp = await httpRequest({ url: `http://localhost:1337` });
	expect(resp.data).toBe('Hello World\n');
	server.close();
});

it('test download file', async () => {
	const server = createServer((_req, resp) => resp.end('Hello World\n')).listen(1337);

	const dir = join(__dirname, 'test');
	const file = join(dir, 'test.txt');

	expect(await exists(dir)).toBe(false);
	expect(await exists(file)).toBe(false);

	await downloadOnFs({ url: `http://localhost:1337` }, file);

	expect((await readFileSync(file)).toString()).toBe('Hello World\n');

	rmSync(dir, { recursive: true, force: true });

	server.close();
});
