var fs = require("fs");

exports.getAllDirectory = getAllDirectory;
exports.getImageNameByAlbums = getImageNameByAlbums;
function getAllDirectory(callback) {
	fs.readdir("./uploads", (err, files) => {
		if(err) {
			callback("找不到upload文件夹", null);
			return;
		}
		var allAlbums = [];
		(function iterator(i) {
			if(i === files.length) {
				callback(null, allAlbums);
				return;
			}
			fs.stat("./uploads/" + files[i], (err, stats) => {
				if(err) {
					callback("找不到" + files[i], null);
					return;
				}
				if(stats.isDirectory()) {
					allAlbums.push(files[i]);
				}
				iterator(i + 1);
			});
		})(0)
	});
}

function getImageNameByAlbums(albumName, callback) {
	fs.readdir("./uploads/" + albumName, (err, files) => {
		if(err) {
			callback("找不到"+ albumName +"文件夹", null);
			return;
		}
		var imagesName = [];
		(function iterator(i) {
			if(i === files.length) {
				callback(null, imagesName);
				return;
			}
			fs.stat("./uploads/" + albumName + "/" + files[i], (err, stats) => {
				if(err) {
					callback("找不到" + files[i], null);
					return;
				}
				if(stats.isFile()) {
					imagesName.push(files[i]);
				}
				iterator(i + 1);
			});
		})(0)
	});
}