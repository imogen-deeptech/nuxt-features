import * as fs from "node:fs";
import * as path from "node:path";

import { extendPages } from "nuxt/kit";
import type { NuxtPage } from "nuxt/schema";
import type { Area } from "../types/area";

const getPagePath = (pageName: string, areaName: string, areaSubDirectory: string, indexAreaName: string) => {
	const joinedAreaName = areaSubDirectory.length > 0 ? `${areaName}/${areaSubDirectory}` : areaName;
	const fixedPageName = pageName.replace("index", "").replace(/\[(\w+)\]/g, ":$1");
	const fixedAreaName = joinedAreaName.replace(indexAreaName, "").replace(/\[(\w+)\]/g, ":$1");

	const pagePortion = fixedPageName.length > 0 ? `/${fixedPageName}` : "";
	const areaPortion = fixedAreaName.length > 0 ? `/${fixedAreaName}` : "";

	return `${areaPortion}${pagePortion}`;
};

export const getPagesWithinArea = (
	pagesPath: string,
	areaName: string,
	indexAreaName: string,
	recursive: boolean,
	levelName?: string,
): NuxtPage[] => {
	const safeLevelName = levelName ?? "";
	const currentLevelPath = path.resolve(pagesPath, safeLevelName);

	const allEntries = fs.readdirSync(currentLevelPath, { withFileTypes: true });
	const nestedDirectories = allEntries.filter((entity) => entity.isDirectory());
	const currentLevelEntries = allEntries.filter(
		(entity) => entity.isFile() && entity.name.endsWith(".vue"),
	);

	const nestedPages = nestedDirectories.flatMap((entity) => {
		if (!recursive) return [];

		const nextLevelName = path.join(safeLevelName, entity.name);
		const nextLevelPages = getPagesWithinArea(pagesPath, areaName, indexAreaName, true, nextLevelName);

		return nextLevelPages;
	});

	return currentLevelEntries.map((entity) => {
		const parsedPath = path.parse(entity.name);
		const pageFile = path.resolve(pagesPath, safeLevelName, parsedPath.base);
		const pagePath = getPagePath(parsedPath.name, areaName, safeLevelName, indexAreaName);

		return { file: pageFile, path: pagePath, children: nestedPages };
	});
};

export const addPages = (area: Area, indexName: string) => {
	const areaRoot = area.getRoot();
	const pagesRoot = area.getDirectory("pages");

	const rootPages = fs.existsSync(areaRoot)
		? getPagesWithinArea(areaRoot, area.name, indexName, false)
		: [];
	const directoryPages = fs.existsSync(pagesRoot)
		? getPagesWithinArea(pagesRoot, area.name, indexName, true)
		: [];

	const allPages = rootPages.concat(directoryPages);

	extendPages((pageCollection) => {
		pageCollection.push(...allPages);
	});
};
