import { getRequestFn, httpRequest, httpSimpleReq } from './http';
import { get } from 'https';
import { IncomingMessage } from 'http';
import { Writable } from 'stream';
import { bytes } from 'iggs-utils';
import { appendFileSync, createWriteStream } from 'fs';

const url =
	"https://player.odycdn.com/api/v4/streams/free/%E2%9D%84%EF%B8%8Fep134-'christmas-holiday-ornament/9d29250fe0481d97d68309b701c2b3789fe78d33/a81b43?download=true";

var totArrived = 0;
var writable = new Writable({
	write: function (chunk, encoding, next) {
		totArrived += chunk.length;
		console.log('arrived MB', totArrived / bytes.MB, ': memory usage', process.memoryUsage().rss / bytes.MB);
		appendFileSync('/home/alex/Videos/test.mp4', chunk);
		next();
	},
});

const req = httpSimpleReq(url);
req.on('response', inMsg => {
	inMsg.pipe(writable);
});
