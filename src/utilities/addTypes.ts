import { addImportsDir } from "@nuxt/kit";
import type { Area } from "../types/area.ts";

export const addTypes = (area: Area, directories: string[]) => {
	for (const directory of directories) {
		addImportsDir(area.getDirectory(directory));
	}
};
