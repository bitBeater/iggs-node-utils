"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandTilde = exports.isTildeNotation = exports.TILDE_NOTATION_REX = void 0;
const path_1 = require("path");
const dirs_1 = require("./dirs");
exports.TILDE_NOTATION_REX = /^~[/|\\]?/;
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
//# sourceMappingURL=paths.js.map