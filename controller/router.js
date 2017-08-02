var file = require("../models/file.js");
var formidable = require('formidable');
var path = require("path");	
var fs = require("fs");

exports.showIndex = showIndex;
exports.showAlbum = showAlbum;
exports.showUp = showUp;
exports.doPost = doPost;

function showIndex(req, res, next) {
	file.getAllDirectory((err, allAlbums) => {
		if(err) {
			// res.send("err");
			next();
			return;
		}
		res.render("index", {
			albumDir : allAlbums
		});
	});
}

function showAlbum(req, res, next) {
	var albumName = req.params.albumName;
	file.getImageNameByAlbums(albumName, (err, imagesName) => {
		if(err) {
			// res.send('111');
			next();
			return;
		}
		res.render("album", {
			albumName : albumName,
			images : imagesName
		});
	});	
}

function showUp(req, res, next) {
	file.getDirNames((err, dirNames) => {
		if(err) {
			next();
			return;
		}
		res.render("upImage", {
			dirNames: dirNames
		})
	});	
}

function doPost(req, res) {
	var form = new formidable.IncomingForm();
 	form.uploadDir = path.normalize(__dirname + "/../tempup/");
    form.parse(req, function(err, fields, files) {
      console.log(fields);
      console.log(files);
      var dirName = fields.dirName;
      var oldpath = files.imageName.path;
      var num = parseInt(Math.random()*89999 + 10000) + '';
      var mimeName = path.extname(files.imageName.name);
      var newpath = path.normalize(__dirname + "/../uploads/" + dirName + "/" + num + mimeName);

      fs.rename(oldpath, newpath, (err) =>  {
      	if(err) {
      		res.send("改名失败");
      	}
      });
    });

    res.send("成功")
}