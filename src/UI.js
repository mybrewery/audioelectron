"use strict";

define([], function() {
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

		forEach: function(selector, callback, context, root){
			root = root || document;

			var elements = root.querySelectorAll(selector);

			for(var a = 0; a < elements.length; a++) {
				callback.call(context, elements[a]);
			}
		}

	};

	return UI;
})