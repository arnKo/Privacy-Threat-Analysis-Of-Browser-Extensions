var path = require('path');

module.exports.get = function(req, res, next) {
	
	var fileName = req.query.filename;

	console.log(req.query);
	if(req.query.mime === 'text/plain') {	
		res.download(path.join('./', 'public', 'downloads', 'file_b.txt'), fileName);
	}
	else {
		res.download('./public/downloads/' + fileName);
	}
	
}