var file = require("../models/file.js");

exports.showIndex = showIndex;
exports.showAlbum = showAlbum;

function showIndex(req, res) {
	file.getAllDirectory((err, allAlbums) => {
		if(err) {
			res.send("err");
			return;
		}
		res.render("index", {
			albumDir : allAlbums
		});
	});
}

function showAlbum(req, res) {
	var albumName = req.params.albumName;
	file.getImageNameByAlbums(albumName, (err, imagesName) => {
		if(err) {
			res.send('111');
			return;
		}
		res.render("album", {
			albumName : albumName,
			images : imagesName
		});
	});	
}