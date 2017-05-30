"use strict";

define(["howler"], function(howler) {
	var directory_tree = require('directory-tree');
	var Playlist = function() {
		this.content = [];
	};

	Playlist.fromDir = function(path) {
		var tree = directory_tree(path);
		var files = this.filterFiles(tree, ".mp3");

		var playlist = new Playlist;
		playlist.pushMultiple(files);
		return playlist;
	};

	Playlist.filterFiles = function(tree, extension) {
		var result = [];
		iterate(tree);

		function iterate(dir) {
			for(var a = 0, l = dir.children.length, child; a < l; a++) {
					child = dir.children[a];
					switch(child.type) {
						case "file": 
							if(extension == child.extension) {
								result.push(child);	
							}
						break;
						case "directory":
							iterate(child);
						break;
					}
			}
		}

		return result;
	};

	Playlist.prototype = {
		fromDir: Playlist.fromDir,
		push: function(path){
			this.content.push(path);
		},
		pushMultiple: function(paths) {
			for(var a = 0, l = paths.length; a < l; a++) {
				this.push(paths[a]);
			}
		}
	};

	return Playlist;
})