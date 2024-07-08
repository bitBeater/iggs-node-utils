import { join } from 'path';
import { getOsUserHomeDir } from './dirs';

export const TILDE_NOTATION_REX = /^~[/|\\]?/;

/**
 * Checks if the given path is in tilde notation.
 * 
 * @param path - The path to check.
 * @returns `true` if the path is in tilde notation, `false` otherwise.
 */
export function isTildeNotation(path: string) {
    return TILDE_NOTATION_REX.test(path);
}

/**
 * Expands a tilde (~) notation in a path to the user's home directory.
 * 
 * @param path - The path containing the tilde (~) notation.
 * @returns The expanded path with the tilde (~) notation replaced by the user's home directory.
 */
export function expandTilde(path: string): string {
    return join(getOsUserHomeDir(), path.replace(TILDE_NOTATION_REX, ''));
}
