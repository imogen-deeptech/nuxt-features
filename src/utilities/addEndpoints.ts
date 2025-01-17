import * as fs from "node:fs";
import * as path from "node:path";

import { addImportsSources } from "@nuxt/kit";
import { camelize, capitalize } from "vue";
import type { Area } from "../types/area.ts";

export const addEndpoints = (area: Area) => {
	const pascalizedAreaName = capitalize(camelize(area.name));
	const endpointsPath = area.getDirectory("endpoints");

	if (!fs.existsSync(endpointsPath)) return;

	fs.readdirSync(endpointsPath, { withFileTypes: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith(".ts"))
		.forEach((entry) => {
			const camelizedEndpointName = camelize(entry.name.replace(".ts", ""));
			const pascalizedEndpointName = capitalize(camelizedEndpointName);
			const endpoint = !pascalizedEndpointName.startsWith(pascalizedAreaName)
				? `${pascalizedAreaName}${pascalizedEndpointName}Endpoint`
				: `${pascalizedEndpointName}Endpoint`;

			addImportsSources({
				from: path.resolve(endpointsPath, entry.name),
				imports: [{ name: "default", as: endpoint }],
			});
		});
};
