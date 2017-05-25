"use strict";

define ([
	"Loader",
	"Player",
	], function(Loader, Player) {
	var Manager = function() {
		this.loader = new Loader;
		this.player = new Player(document.body);
		this.loader.load(this.init.bind(this));
	};

	Manager.prototype = {
		init: function(){
			console.log(arguments);
		}
	};

	return Manager;
})