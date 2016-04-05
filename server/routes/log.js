var fs = require('fs');

var logPath = __dirname + '/../log/log.txt';

module.exports.post = function(req, res, next) {
	
	var d = new Date();
	fs.appendFileSync(logPath, "\nPOST LOG at " + d.toLocaleString() + '\n');
	fs.appendFileSync(logPath,  req.protocol + '://' + req.get('host') + req.originalUrl + '\n');
	fs.appendFileSync(logPath, JSON.stringify(req.body, null, 4));
	
	res.send('');
}

module.exports.get = function(req, res, next) {
	
	var d = new Date();
	fs.appendFileSync(logPath, "\nGET LOG at " + d.toLocaleString() + '\n');
	fs.appendFileSync(logPath,  req.protocol + '://' + req.get('host') + req.originalUrl + '\n');
	fs.appendFileSync(logPath, JSON.stringify(req.query, null, 4));
	
	res.send('');
}

