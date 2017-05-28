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
		var paused = true;

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
			},

			get paused() {
				return paused;
			},

			set paused(key) {
				ui.forEach(".button.play", function(element){
					!key ? element.classList.add("hidden") : element.classList.remove("hidden"); 
				}, this, this.element);

				ui.forEach(".button.pause", function(element){
					key ? element.classList.add("hidden") : element.classList.remove("hidden"); 
				}, this, this.element);

				paused = key;
			}	
		};


		ui.forEach("#progress.button", function(element){
			element.addEventListener("mousedown", function(evt){
				element.captured = true;

			}.bind(this));
		}, this, this.current.element);

		ui.forEach("#progress.button", function(element){
			window.addEventListener("mouseup", function(evt){
				element.captured = false;
			}.bind(this));
		}, this, this.current.element);

		ui.forEach("#progress.button", function(element){
			window.addEventListener("mousemove", function(evt){
				if(element.captured) {
					var value = (evt.clientX - 25)/element.clientWidth * 100;
 					this.current.setProgress(value);
				}
			}.bind(this));
		}, this, this.current.element);



		ui.forEach(".button", function(element){
			element.addEventListener("click", this.onCurrentButtonClick.bind(this, element));
		}, this, this.current.element);

		ui.forEach('#current-placeholder', function(element){
			element.appendChild(this.current.element);
		}, this);


		this.current.setProgress(25);
		this.current.setInfo("Unknown", "Track 29");
	};
	
	Player.prototype = {
		onCurrentButtonClick: function(button, evt){
			var action = button.getAttribute("data-action");

			switch(action) {
				case "play": 
					this.current.paused = !this.current.paused;
				break;
				case "prev": 

				break;
				case "next": 

				break;
				case "pause": 
					this.current.paused = !this.current.paused;
				break;
				case "progress":
 					var value = (evt.clientX - 25)/button.clientWidth * 100;
 					this.current.setProgress(value);
 				break;
			}
		}
	};

	return Player;
})