const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
	transpileDependencies: ["vuetify"],
	configureWebpack: () => {
		if (process.env.NODE_ENV !== "production") return;
		return {
			plugins: [
				new PrerenderSPAPlugin(
					// Absolute path to compiled SPA
					path.resolve(__dirname, "dist"),
					// List of routes to prerender
					["/", "/upload", "/about", "/contact"],
					{
						postProcessHtml: function(context) {
							var titles = {
								"/": "Home Page",
								"/upload": "Files Upload",
								"/about": "About",
								"/contact": "Contact",
								"/*": "404 Not Found",
							};
							return context.html.replace(
								/<title>[^<]*<\/title>/i,
								"<title>" + titles[context.route] + "</title>"
							);
						},
					},

				),
			],
		};
	},
};
