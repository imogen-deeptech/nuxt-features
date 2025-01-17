import * as path from "node:path";
import type { Nuxt } from "nuxt/schema";

export const getRootDirectory = (nuxt: Nuxt, rootDirectoryName: string) => {
	return path.resolve(nuxt.options.srcDir, rootDirectoryName);
};
