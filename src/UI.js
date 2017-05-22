"use strict";

define([
	"file!UI/audio_item.html"
	], function(audioitemhtml) {
	var UI = function() {

	};

	UI.prototype = {
		html2DOM: function(html) {
			var div = document.createElement("div");
			div.innerHTML = html;
			var node = div.firstChild;
			div.removeChild(node);
			return node;

		},

		createAudioItem: function() {
			document.body.appendChild(this.html2DOM(audioitemhtml));
		}

	};

	return UI;
})