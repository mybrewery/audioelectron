"use strict";

define (["Loader"], function(Loader) {
	var Manager = function() {
		this.loader = new Loader;
		this.loader.load(this.init.bind(this));
	};

	Manager.prototype = {
		init: function(){
			console.log(arguments);
		}
	};

	return Manager;
})