import type { Nuxt } from "nuxt/schema";
import type { Area } from "../types/area.ts";

export const addPathAlias = (area: Area, nuxt: Nuxt) => {
	const aliasName1 = `@f/${area.name}`;
	const aliasName2 = `~f/${area.name}`;
	const areaRoot = area.getRoot();

	nuxt.options.alias[aliasName1] = areaRoot;
	nuxt.options.alias[aliasName2] = areaRoot;
};
