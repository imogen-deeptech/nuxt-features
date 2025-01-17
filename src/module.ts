import { defineNuxtModule } from "@nuxt/kit";
import { addComponents } from "./utilities/addComponents.ts";
import { addEndpoints } from "./utilities/addEndpoints.ts";
import { addPages } from "./utilities/addPages.ts";
import { addTypes } from "./utilities/addTypes.ts";
import { getAreas } from "./utilities/getAreas.ts";
import { getRootDirectory } from "./utilities/getRootDirectory.ts";

export interface ModuleOptions {
	readonly indexFeature: string;
	readonly rootDirectory: string;
	readonly autoImportDirectories: string[];
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: "@imogen/nuxt-features",
		configKey: "nuxtFeatures",
	},
	defaults: {
		indexFeature: "home",
		rootDirectory: "features",
		autoImportDirectories: [],
	},
	setup(options, nuxt) {
		const rootDirectory = getRootDirectory(nuxt, options.rootDirectory);
		const areas = getAreas(rootDirectory);

		for (const area of areas) {
			addEndpoints(area);
			addComponents(area);
			addPages(area, options.indexFeature);
			addTypes(area, options.autoImportDirectories);
		}
	},
});
