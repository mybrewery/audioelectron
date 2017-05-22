console.log(true);

requirejs.config({
	paths: {
		howler: "../node_modules/howler/dist/howler"
	},
	baseUrl: "src"

});

requirejs(["Manager"], function(Manager) {
	window.app = new Manager;
});