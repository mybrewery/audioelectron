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
			setProgress: function(value) {
				ui.forEach("#line", function(element){
					element.style.width = value + "%";
				}, this);
			},

			setInfo: function(artist, title) {
				ui.forEach(".artist", function(element){
					element.innerHTML = artist;
				}, this);

				ui.forEach(".title", function(element){
					element.innerHTML = title;
				}, this);
			}
		};


		ui.forEach('#current-placeholder', function(element){
			element.appendChild(this.current.element);
		}, this);


		this.current.setProgress(25);
		this.current.setInfo("Unknown", "Track 29");
	};
	
	Player.prototype = {
	};

	return Player;
})