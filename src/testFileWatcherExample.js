
var watcher = require("./recursiveFileWatcher");

var callback = function(event, filename, path){

	console.log("got a filewatch callback");
	console.log(event);
	console.log(filename);
	console.log(path);
}

watcher.watch("../fileWatcherTestFolder", callback, {debug: false});