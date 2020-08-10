const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
	transpileDependencies: ["vuetify"],
	plugins: [
		new PrerenderSPAPlugin(
			// Absolute path to compiled SPA
			path.resolve(__dirname, "dist"),
			// List of routes to prerender
			["/contact"],
			{
				// options
			}
		),
	],
};
