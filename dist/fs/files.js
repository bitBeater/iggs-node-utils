"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.silentRemove = exports.copyFileRecursive = exports.writeFileAndDir = exports.remove = exports.writeJson = exports.readJson = exports.write = exports.append = exports.exists = exports.removeSync = exports.deserealizeObjectSync = exports.serealizeObjectSync = exports.readGZipSync = exports.writeGZipSync = exports.fileLinesSync = exports.insertBetweenPlacweHoldersSync = exports.readJsonSync = exports.writeJsonSync = exports.writeSync = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const iggs_utils_1 = require("iggs-utils");
const zlib_1 = require("zlib");
/** *
 * If `data` is a plain object, it must have an own (not inherited) `toString`function property.
 *
 * The `mode` option only affects the newly created file. See {@link open} for more details.
 *
 * For detailed information, see the documentation of the asynchronous version of
 * this API: {@link writeFile}.
 * @param file filename or file descriptor
 */
function writeSync(file, data, options) {
    const dirPath = (0, path_1.dirname)(file.toString());
    if (!(0, fs_1.existsSync)(dirPath))
        (0, fs_1.mkdirSync)((0, path_1.dirname)(dirPath));
    (0, fs_1.writeFileSync)(file, data || '');
}
exports.writeSync = writeSync;
/**
 * Writes the given object as JSON to the specified file path synchronously.
 * @param path - The file path where the JSON should be written.
 * @param object - The object to be written as JSON.
 */
function writeJsonSync(path, object) {
    (0, fs_1.writeFileSync)(path, JSON.stringify(object));
}
exports.writeJsonSync = writeJsonSync;
/**
 * Reads and parses a JSON file synchronously.
 *
 * @template T - The type of the parsed JSON object.
 * @param {string} path - The path to the JSON file.
 * @param {reviver.Reviver<any>} [reviver] - Optional reviver function for JSON.parse.
 * @returns {T} - The parsed JSON object.
 */
function readJsonSync(path, reviver) {
    const data = (0, fs_1.readFileSync)(path);
    if (!data)
        return;
    const retVal = JSON.parse(data.toString(), reviver);
    return retVal;
}
exports.readJsonSync = readJsonSync;
/**
 * Inserts the specified data between the given placeholders in the file synchronously.
 * If the file does not exist, it creates the file and inserts the data.
 *
 * @param filePath - The path of the file.
 * @param data - The data to be inserted between the placeholders.
 * @param beginPlaceHolder - The beginning placeholder.
 * @param endPlaceHolder - The ending placeholder.
 */
function insertBetweenPlacweHoldersSync(filePath, data, beginPlaceHolder, endPlaceHolder) {
    var _a, _b, _c, _d, _e, _f;
    const writeData = (0, fs_1.readFileSync)(filePath);
    if (!(0, fs_1.existsSync)(filePath)) {
        (0, fs_1.writeFileSync)(filePath, writeData);
    }
    const fileContent = (0, fs_1.readFileSync)(filePath).toString();
    const top = (_b = (_a = fileContent === null || fileContent === void 0 ? void 0 : fileContent.split) === null || _a === void 0 ? void 0 : _a.call(fileContent, beginPlaceHolder)) === null || _b === void 0 ? void 0 : _b[0];
    const bottom = (_f = (_e = (_c = fileContent === null || fileContent === void 0 ? void 0 : fileContent.split) === null || _c === void 0 ? void 0 : (_d = _c.call(fileContent, endPlaceHolder)).reverse) === null || _e === void 0 ? void 0 : _e.call(_d)) === null || _f === void 0 ? void 0 : _f[0];
    (0, fs_1.writeFileSync)(filePath, `${top}\n\r${beginPlaceHolder}\n\r${data}\n\r${endPlaceHolder}\n\r${bottom}`);
}
exports.insertBetweenPlacweHoldersSync = insertBetweenPlacweHoldersSync;
/**
 * Reads a file and returns an array of string lines.
 *
 * @param path - The path to the file.
 * @param lineSeparator - The regular expression used to split the file into lines. Defaults to /[\n|\r]/.
 * @returns An array of lines from the file, or null if the file cannot be read.
 */
function fileLinesSync(path, lineSeparator = /[\n|\r]/) {
    var _a;
    try {
        const data = (_a = (0, fs_1.readFileSync)(path)) === null || _a === void 0 ? void 0 : _a.toString();
        if (!data)
            return null;
        return data.split(lineSeparator);
    }
    catch (error) {
        console.error(error);
    }
}
exports.fileLinesSync = fileLinesSync;
/**
 * Writes the given data to a file in GZip format synchronously.
 *
 * @param filePath - The path to the file.
 * @param data - The data to be written to the file. It can be a string or a Buffer.
 * @param writeFileOptions - The options for writing the file (optional).
 * @param zLibOptions - The options for compressing the data using zlib (optional).
 */
function writeGZipSync(filePath, data, writeFileOptions, zLibOptions) {
    const buffer = data instanceof Buffer ? data : Buffer.from(data);
    const zippBuffer = (0, zlib_1.gzipSync)(buffer, zLibOptions);
    (0, fs_1.writeFileSync)(filePath, zippBuffer, writeFileOptions);
}
exports.writeGZipSync = writeGZipSync;
/**
 * Reads a gzipped file synchronously and returns the uncompressed data as a Buffer.
 *
 * @param path - The path to the gzipped file.
 * @param readFileOptions - The options to pass to the `readFileSync` function.
 * @param zlibOptions - The options to pass to the `unzipSync` function.
 * @returns The uncompressed data as a Buffer.
 */
function readGZipSync(path, readFileOptions, zlibOptions) {
    const data = (0, fs_1.readFileSync)(path, readFileOptions);
    return (0, zlib_1.unzipSync)(data, zlibOptions);
}
exports.readGZipSync = readGZipSync;
/**
 * Serializes an object to JSON and writes it to a file synchronously.
 * @param filePath - The path of the file to write.
 * @param object - The object to serialize and write to the file.
 */
function serealizeObjectSync(filePath, object) {
    writeGZipSync(filePath, JSON.stringify(object));
}
exports.serealizeObjectSync = serealizeObjectSync;
/**
 * Deserializes an object from a file synchronously.
 *
 * @param filePath - The path to the file.
 * @returns The deserialized object.
 */
function deserealizeObjectSync(filePath) {
    return JSON.parse(readGZipSync(filePath).toString());
}
exports.deserealizeObjectSync = deserealizeObjectSync;
/**
 * Synchronous [`unlink(2)`](http://man7.org/linux/man-pages/man2/unlink.2.html). Returns `undefined`.
 * @return `undefined` upon success.
 * @see {@link unlinkSync}
 */
function removeSync(path) {
    try {
        (0, fs_1.unlinkSync)(path);
    }
    catch (e) {
        if ((e === null || e === void 0 ? void 0 : e.code) !== 'ENOENT')
            throw e;
    }
}
exports.removeSync = removeSync;
/**
 * check if file exists
 *
 *
 * @param path file path
 * @returns true if exists false otherwise
 *
 * @see{@link stat}
 */
const exists = (path) => (0, promises_1.stat)(path)
    .then(() => true)
    .catch(e => {
    if ((e === null || e === void 0 ? void 0 : e.code) === 'ENOENT')
        return false;
    throw e;
});
exports.exists = exists;
/**
 * add to file, if the file or folder does not exist it will be recursively created
 * @param path
 * @param data
 * @param options
 * @returns
 */
function append(path, data, options) {
    return (0, promises_1.appendFile)(path, data, options).catch(error => {
        if (error.code === 'ENOENT')
            return (0, promises_1.mkdir)((0, path_1.dirname)(path.toString()), { recursive: true }).then(() => append(path, data, options));
        return error;
    });
}
exports.append = append;
/**
 * write to file, if the folder does not exist it will be recursively created
 *
 * @param file filename or `FileHandle`
 * @param data
 * @param options
 * @return Fulfills with `undefined` upon success.
 *
 *
 * @see{@link exists}
 * @see{@link mkdir}
 * @see{@link writeFile}
 */
function write(file, data, options) {
    const dirPath = (0, path_1.dirname)(file.toString());
    return (0, exports.exists)(dirPath).then(exist => {
        const _opt = typeof options === 'string' ? { encoding: options } : options;
        let promise = iggs_utils_1.promises.of();
        if (!exist)
            promise = (0, promises_1.mkdir)(dirPath, Object.assign(Object.assign({}, _opt), { recursive: true }));
        return promise.then(() => (0, promises_1.writeFile)(file, data || '', options));
    });
}
exports.write = write;
/**
 * Asynchronously reads the entire contents of a file that contains a valid JSON string, and converts the content into an object.
 *
 * @param file filename or `FileHandle`
 * @param options
 * @param reviver A function that transforms the results. This function is called for each member of the object.
 * If a member contains nested objects, the nested objects are transformed before the parent object is.
 *
 * @see{@link readFile}
 * @see{@link JSON.parse}
 */
function readJson(file, options, reviver) {
    return (0, promises_1.readFile)(file, options).then(fileContent => JSON.parse(fileContent.toString(), reviver));
}
exports.readJson = readJson;
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string, and asynchronously writes data to a file, replacing the file if it already exists.
 *
 * @param file filename or `FileHandle`
 * @param obj A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns
 * @see {@link JSON.stringify}
 * @see {@link write}
 */
function writeJson(file, obj, options, replacer, space) {
    const data = JSON.stringify(obj, replacer, space);
    return write(file, data, options);
}
exports.writeJson = writeJson;
/**
 * If `path` refers to a symbolic link, then the link is removed without affecting
 * the file or directory to which that link refers. If the `path` refers to a file
 * path that is not a symbolic link, the file is deleted. See the POSIX [`unlink(2)`](http://man7.org/linux/man-pages/man2/unlink.2.html) documentation for more detail.
 * @return Fulfills with `undefined` upon success.
 * @see {@link unlink}
 */
function remove(path) {
    return (0, promises_1.unlink)(path).catch(e => (e.code === 'ENOENT' ? undefined : e));
}
exports.remove = remove;
/**
 * Writes data to a file and creates the necessary directory structure if it doesn't exist.
 *
 * @param path - The path to the file.
 * @param data - The data to write to the file.
 * @param options - The options for writing the file.
 */
function writeFileAndDir(path, data, options) {
    const parentDir = (0, path_1.resolve)(path, '..');
    if (!(0, fs_1.existsSync)(parentDir)) {
        (0, fs_1.mkdirSync)(parentDir, { recursive: true });
    }
    data = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    (0, fs_1.writeFileSync)(path, data, options);
}
exports.writeFileAndDir = writeFileAndDir;
function copyFileRecursive(origPath, destPath) {
    const destParentDir = (0, path_1.resolve)(destPath, '..');
    if (!(0, fs_1.existsSync)(destParentDir)) {
        (0, fs_1.mkdirSync)(destParentDir, { recursive: true });
    }
    (0, fs_1.copyFileSync)(origPath, destPath);
}
exports.copyFileRecursive = copyFileRecursive;
/**
 * remove sync, without throwing NotFound error if it doesn't exist
 * @param path
 * @param options
 */
function silentRemove(path, options) {
    try {
        (0, fs_1.rmSync)(path, options);
    }
    catch (error) {
        if ((error.code !== 'ENOENT'))
            throw error;
    }
}
exports.silentRemove = silentRemove;
//# sourceMappingURL=files.js.map