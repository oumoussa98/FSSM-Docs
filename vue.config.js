const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

// prerender smp routes
let smpRoutes = [];
let smpTitles = {};
for (let i = 1; i < 7; i++) {
	smpRoutes.push("/licence-fondamental/smp/s" + i);
	smpTitles["/licence-fondamental/smp/s" + i] =
		"licence-fondamental-SMP-S" + i;
}
module.exports = {
	transpileDependencies: ["vuetify"],
	configureWebpack: () => {
		if (process.env.NODE_ENV !== "production") return;
		return {
			plugins: [
				new PrerenderSPAPlugin({
					// Absolute path to compiled SPA
					staticDir: path.join(__dirname, "dist"),
					// List of routes to prerender
					routes: ["/", "/upload", "/about", "/contact", ...smpRoutes],
					postProcess: context => {
						if (context.route.endsWith('.html')) {
							context.outputPath = path.join(__dirname, 'dist', context.route)
						}
						let titles = {
							"/": "Home Page",
							"/upload": "Files Upload",
							"/about": "About",
							"/contact": "Contact",
							"/404": "404 Not Found",
							...smpTitles
						};
						return context.html.replace(
							/<title>[^<]*<\/title>/i,
							"<title>" + titles[context.route] + "</title>"
						);
					},
				}),
			],
		};
	},
};
