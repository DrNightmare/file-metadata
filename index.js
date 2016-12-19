var express = require('express');
var fs = require('fs');
var multer = require('multer');
var app = express();
var upload = multer();

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'uploads');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});

var upload = multer({storage: storage}).single('testFile');

app.set('view engine', 'pug');

app.get('/', function(req, res) {
	res.render('index', {title: "File Metadata service"});
});

app.post('/upload/', function(req, res){
	upload(req, res, function(err) {
		if (err) console.log(err);
		else console.log("Upload complete");
		var fileSizeInBytes = req.file.size;
		res.send({fileName : req.file.originalname, fileSize : fileSizeInBytes})
	});
});

var server = app.listen(process.env.PORT || 5000, function() {
	var port = server.address().port;
	console.log("Server running at port : ", port);
});