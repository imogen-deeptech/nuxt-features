export default defineNuxtConfig({
	modules: ["../src/module"],

	nuxtFeatures: {
		indexFeature: "home",
		rootDirectory: "features",
		autoImportDirectories: [],
	},

	devtools: { enabled: true },
	compatibilityDate: "2025-01-17",
});
