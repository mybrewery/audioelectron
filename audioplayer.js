console.log(true);

requirejs.config({
	paths: {
		howler: "../node_modules/howler/dist/howler",
		file: '../node_modules/requirejs-text/text',
	},
	baseUrl: "src"

});

requirejs(["Manager"], function(Manager) {
	window.app = new Manager;
});