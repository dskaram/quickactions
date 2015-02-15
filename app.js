var express = require('express');
var fs = require('fs');
var async = require('async');
var _ = require('lodash');
var app = express();

app.get('/explore*', function (req, res) {
	var requestedPath= __dirname + "/content/" + req.params[0] + "/";
	if (requestedPath.indexOf("..") !== -1) {
		return res.json([]);
	}

	var files;

	async.compose(
		function(filenames, callback) {
			files= filenames;
			var pathResults= filenames.map(function(fileName) { return requestedPath + fileName });
			async.map(pathResults, fs.stat, callback);
		},
		function(path, callback) {
			fs.readdir(requestedPath, callback);
		}
	)(null, function(error, stats) {
		if (error && error.code === "ENOTDIR") {
			res.download(requestedPath.substring(0, requestedPath.length - 1));
		} else {
			res.json(stats.map(function(stat, index) {
				return {
					label: files[index],
					isDirectory: stat.isDirectory()
				}
			}));
		}
	});
});

app.use(express.static(__dirname + "/quickaction"));

var server = app.listen(3000, function () {
	var host = server.address().address;
  	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
