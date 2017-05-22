"use strict";

define (["howler"], function(howler) {
	var Loader = function() {
		this.directory_tree = require('directory-tree');
		this.onSoundLoaded = this.onSoundLoaded.bind(this);
	};

	Loader.prototype = {
		load: function(onComplete) {
			var tree = this.tree = this.directory_tree("pesni");
			var result = this.result = [];

			this.onComplete = onComplete;

			this.count = tree.children.length;
			this.loaded = 0;

			for (var a = 0, sound; a < tree.children.length; a++) {
				sound = new howler.Howl({
					src: [tree.children[a].path],
					onload: this.onSoundLoaded,
					onloaderror: this.onSoundLoaded
				});

				result.push({
					sound: sound,
					file: tree.children[a]
				});

			}

			console.log(tree);
		},

		onSoundLoaded: function(){
			this.loaded++;
			console.log(this.count, this.loaded);

			if (this.onComplete&&this.loaded == this.count) {
				this.onComplete(this.result);
			}
		}

	};

	return Loader;
})