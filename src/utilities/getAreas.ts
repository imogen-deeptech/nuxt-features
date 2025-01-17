import * as fs from "node:fs";
import { Area } from "../types/area.ts";

export const getAreas = (root: string) => {
	const areas = fs
		.readdirSync(root, { withFileTypes: true })
		.filter((entity) => entity.isDirectory())
		.map((entity) => new Area(entity.name, root));

	return areas;
};
