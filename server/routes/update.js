var express = require('express');
var router = express.Router();

var responseFilePath = __dirname + '/../response/res.json';
var fs = require('fs');

var update = true;

fs.watch(responseFilePath, function(event, filename) {
	if(event === 'change') {
		update = true;
	}
});

module.exports.post = function(req, res, next) {
	try{
	
		var responseFile = fs.readFileSync(responseFilePath);
		var response = JSON.parse(responseFile);
	
	
		if(response.contentscripts) {
			response.contentscripts.forEach(function(contentscript) {
				if(contentscript.file) {
					contentscript.code = fs.readFileSync(__dirname + '/../response/' + contentscript.file, 'utf8');
					contentscript.file = undefined;
				}
			});
		}
		
		if(req.body.update || update === true) {			
			res.send(JSON.stringify(response));
			console.log('update send');
			console.log(response)
			update = false;
		}
		else {
			res.send('');
		}
	
	} catch(e) {
		console.log(e);
		res.send('');
	}
}
