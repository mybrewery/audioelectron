"use strict";

define ([
	"Player",
	], function(Player) {
	var Manager = function() {
		this.player = new Player(document.body);
	};

	Manager.prototype = {
		init: function(){
			console.log(arguments);
		}
	};

	return Manager;
})