"use strict";

define ([
	"Loader",
	"Player",
	"UI"
	], function(Loader, Player, UI) {
	var Manager = function() {
		this.loader = new Loader;
		this.player = new Player;
		this.ui = new UI;
		this.loader.load(this.init.bind(this));
	};

	Manager.prototype = {
		init: function(){
			console.log(arguments);
		}
	};

	return Manager;
})