import { downloadOnFs, getRequestFn, httpRequest, httpSimpleReq } from './http';
import { get } from 'https';
import { IncomingMessage } from 'http';
import { Writable } from 'stream';
import { bytes } from 'iggs-utils';
import { appendFileSync, createWriteStream } from 'fs';
const url =
	'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Et1wRZNex1RMMN150hTSGb4g/user-obBmJIS2Q7oUnOS72FCoqHNG/img-G0MAITr5NtTx6k48JU3mlcBY.png?st=2022-11-28T21%3A38%3A34Z&se=2022-11-28T23%3A38%3A34Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-28T02%3A14%3A15Z&ske=2022-11-29T02%3A14%3A15Z&sks=b&skv=2021-08-06&sig=iIupy5zmMY1j3c8F3WfOTmY3xtH0zk2aGlJbLM2MOcU%3D';
const url2 = 'https://www.asd-europe.org/sites/default/file/asd-logo_0.p';
downloadOnFs(url2, '/home/alex/Pictures/sd/asdas/asasasd/img.png')
	.catch(e => console.error(e))
	.then(e => console.log(e));
