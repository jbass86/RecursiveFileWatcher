//Script to watch the html template files for our plugins and recompile 
//he templates in the event of any changes to them
//
//Author: Josh Bass
//

var fs = require("fs");
var exec = require('child_process').exec;

var fileWatchMap = {};


//This function will a path to any set of directories as an
//argument and will watch all the html files in any dir that
//has a /res/templates path within the argument provided
var watchFunction = function(topPath){

	fs.readdir(topPath, function(err, files){

		for (var i = 0; i < files.length; i++){

			var currentFile = files[i];

			var cb = function(currentFile, path){

				return function(err, stats){
				
					if (!err && (stats && stats.isDirectory())){

						var origPath = path + currentFile;
						var pathToWatch = path + currentFile;

						var watchFiles = function(pathToWatch){

							fs.readdir(pathToWatch, function(err, files){

								if (files){
									for (var i = 0; i < files.length; i++){

						
										fileToWatch = pathToWatch + "/" + files[i]


										if (!fileWatchMap[fileToWatch]){

											fileWatchMap[fileToWatch] = true;
											console.log("going to watch " + fileToWatch);
											fs.watch(fileToWatch, function(event, filename){

												console.log("file action ");
												console.log("event: " + event);
												console.log("filename: " + filename);
											});
										}
									}
								}	
							});
						}

						var watchDirs = function(pathToWatch){

							//need to watch dir and individual files
							if (!fileWatchMap[pathToWatch]){

								fileWatchMap[pathToWatch] = true;
								console.log("gonna watch " + pathToWatch);

								fs.stat(pathToWatch, function(err, fileName){

									if (!err){
											fs.watch(pathToWatch, function(ev, filename){

											watchDirs(pathToWatch);
											watchFiles(pathToWatch);
										});
									}else{
										console.log("error in fs.sta" + err)
										fileWatchMap[pathToWatch] = false;
									}
								});
							}
						}

						
						watchDirs(pathToWatch);
						watchFiles(pathToWatch);
					}

				}
			}

			var fileToCheck = topPath + currentFile;
			console.log("file to check is " + fileToCheck);
			fs.stat(fileToCheck, cb(currentFile, topPath));
		}	
	});
};


var watchDirectory = function(topPath){

	fs.watch(topPath, function(err, filename){

		console.log("there was a change to the directory " + topPath)
		watchFunction(topPath);
	});
};

watchFunction("web/scripts/plugins/ui/");
watchDirectory("web/scripts/plugins/ui/");

exports.watchDirectory = function(topPath, callback){

}