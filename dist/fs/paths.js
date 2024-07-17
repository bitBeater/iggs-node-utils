"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPathSynthax = exports.resolve = exports.expandTilde = exports.isTildeNotation = exports.PATH_REX = exports.TILDE_NOTATION_REX = void 0;
const path_1 = require("path");
const dirs_1 = require("./dirs");
exports.TILDE_NOTATION_REX = /^~[/|\\]?/;
exports.PATH_REX = /\//;
/**
 * Checks if the given path is in tilde notation.
 *
 * @param path - The path to check.
 * @returns `true` if the path is in tilde notation, `false` otherwise.
 */
function isTildeNotation(path) {
    return exports.TILDE_NOTATION_REX.test(path);
}
exports.isTildeNotation = isTildeNotation;
/**
 * Expands a tilde (~) notation in a path to the user's home directory.
 *
 * @param path - The path containing the tilde (~) notation.
 * @returns The expanded path with the tilde (~) notation replaced by the user's home directory.
 */
function expandTilde(path) {
    return (0, path_1.join)((0, dirs_1.getOsUserHomeDir)(), path.replace(exports.TILDE_NOTATION_REX, ''));
}
exports.expandTilde = expandTilde;
/**
 * Resolves a path to an absolute path.
 * like `path.resolve` but also expands tilde notation.
 *
 * @param path - The path to resolve.
 * @returns The resolved absolute path.
 */
function resolve(path) {
    return isTildeNotation(path) ? expandTilde(path) : (0, path_1.resolve)(path);
}
exports.resolve = resolve;
/**
 * Checks if the given string is a path synthax.
 */
function isPathSynthax(string) {
    return exports.PATH_REX.test(string) || isTildeNotation(string);
}
exports.isPathSynthax = isPathSynthax;
//# sourceMappingURL=paths.js.map