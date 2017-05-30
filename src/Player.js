"use strict";

define([
		"UI",
		"file!Player/HTML/current.html",
		"file!Player/HTML/track.html",
		"file!Player/HTML/list.html",
		"file!Player/HTML/player.html",
		"Player/Playlist"
	], function(UI, currentHTML, trackHTML, listHTML, playerHTML, Playlist){

	var ui = new UI;
	var Player = function(rootElement){
		var paused = true;
		var activePlaylist = false;

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

		/*Playlists*/
		this.playlists = {
			get active() {
				return activePlaylist;
			},
			set active(name) {
				activePlaylist = this.content[name];
				this.updateDOM();

			},
			content: {},
			add: function(name, pl) {
				this.content[name] = pl;
			},
			element: ui.html2DOM(listHTML),
			updateDOM: function() {
				for(var a = 0, l = this.active.content.length, node, file; a < l; a++) {
					node = this.element.querySelector(".track.num" + a);
					file = this.active.content[a];

					if(!node) {
						node = ui.html2DOM(trackHTML);
						node.classList.add("num" + a);
						this.element.appendChild(node);
					}

					ui.forEach(".caption", function(element){
						element.innerHTML = file.name; 
					}, this, node);
				}
			}
		};

		var defaultPlaylist = this.Playlist.fromDir("./music");
		console.log(defaultPlaylist);

		this.playlists.add("default", defaultPlaylist);
		this.playlists.active = "default";

		/*Common*/
		ui.forEach(".button", function(element){
			element.addEventListener("click", this.onCurrentButtonClick.bind(this, element));
		}, this, this.current.element);

		ui.forEach('#current-placeholder', function(element){
			element.appendChild(this.current.element);
		}, this);

		ui.forEach('#list-placeholder', function(element){
			element.appendChild(this.playlists.element);
		}, this);


		this.current.setProgress(25);
		this.current.setInfo("Unknown", "Track 29");
	};
	
	Player.prototype = {
		Playlist: Playlist,
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