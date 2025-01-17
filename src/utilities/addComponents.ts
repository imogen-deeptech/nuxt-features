import * as fs from "node:fs";

import { addComponentsDir } from "@nuxt/kit";
import type { Area } from "../types/area.ts";

export const addComponents = (area: Area) => {
	const componentsPath = area.getDirectory("components");

	if (fs.existsSync(componentsPath)) {
		addComponentsDir({
			enabled: true,
			watch: true,
			global: true,
			prefix: area.name,
			path: componentsPath,
		});
	}
};
