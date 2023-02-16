import { createServer } from 'http';
import { downloadOnFs } from './http';

const server = createServer(function (request, response) {
	response.end('Hello World\n');
}).listen(1337);

// httpRequest({ url: `http://localhost:1337` }).then(p => console.log('rest', p.data));
downloadOnFs(
	{ url: `http://localhost:1337` },
	`/home/alex/repo/alexrr2iggs/ts/libs/iggs-utils/iggs-node-utils/test/diocan.txt`
).finally(() => server.close());
