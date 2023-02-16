"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http_1 = require("http");
const path_1 = require("path");
const files_1 = require("../src/files");
const http_2 = require("../src/http");
it('test httpRequest', () => __awaiter(void 0, void 0, void 0, function* () {
    const server = (0, http_1.createServer)((_req, resp) => resp.end('Hello World\n')).listen(1337);
    const resp = yield (0, http_2.httpRequest)({ url: `http://localhost:1337` });
    expect(resp.data).toBe('Hello World\n');
    server.close();
}));
it('test download file', () => __awaiter(void 0, void 0, void 0, function* () {
    const server = (0, http_1.createServer)((_req, resp) => resp.end('Hello World\n')).listen(1337);
    const dir = (0, path_1.join)(__dirname, 'test');
    const file = (0, path_1.join)(dir, 'test.txt');
    expect(yield (0, files_1.exists)(dir)).toBe(false);
    expect(yield (0, files_1.exists)(file)).toBe(false);
    yield (0, http_2.downloadOnFs)({ url: `http://localhost:1337` }, file);
    expect((yield (0, fs_1.readFileSync)(file)).toString()).toBe('Hello World\n');
    (0, fs_1.rmSync)(dir, { recursive: true, force: true });
    server.close();
}));
//# sourceMappingURL=http.test.js.map