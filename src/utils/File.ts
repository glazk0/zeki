import { resolve } from "node:path";

import { sync } from "glob";

/**
 * Normalizes a path and replaces all backslashes with forward slashes.
 *
 * @param route - The route to normalize.
 *
 * @returns - The normalized path.
 */
const normalizePath = (route: string) => route.replace(/[\\/]+/g, "/");

/**
 * Gets the file paths from a given route.
 *
 * @param route - The route to get the file paths from.
 *
 *  @returns - The file paths.
 */
export const getFilePaths = (route: string) => {
	return sync(normalizePath(`${process.cwd()}/dist/${route}`));
};

/**
 * Gets the file path from a given route.
 *
 * @param route - The route to get the file path from.
 *
 * @returns - The file path.
 */
export const getFilePath = (route: string) => {
	return normalizePath(`${process.cwd()}/dist/${route}`);
};

/**
 * Imports a file.
 *
 * @param filePath - The file path to import.
 *
 * @returns - The imported file.
 */
export const importFile = async (filePath: string) => {
	const file = await import(`file://${resolve(filePath)}`);
	return file.default;
};
