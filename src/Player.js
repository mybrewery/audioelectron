"use strict";

define([
		"UI",
		"file!Player/current.html",
		"file!Player/track.html",
		"file!Player/list.html",
		"file!Player/player.html"
	], function(UI, currentHTML, trackHTML, listHTML, playerHTML){

	var ui = new UI;
	var Player = function(rootElement){
		this.element = ui.html2DOM(playerHTML);

		rootElement.appendChild(this.element);

		/*Current*/
		this.current = {
			element: ui.html2DOM(currentHTML),
		};


		ui.forEach('#current-placeholder', function(element){
			element.appendChild(this.current.element);
		}, this);

	};
	
	Player.prototype = {

	};

	return Player;
})