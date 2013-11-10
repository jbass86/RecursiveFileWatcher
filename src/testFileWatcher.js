
var watcher = require("./recursiveFileWatcher");

var callback = function(event, filename){

	console.log("got a filewatch callback");
	console.log(event);
	console.log(filename);
}

watcher.watch("../fileWatcherTestFolder", callback, {debug: true});