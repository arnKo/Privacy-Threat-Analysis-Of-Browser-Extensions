module.exports.get = function(req, res, next) {
	if(req.query.page) {
		res.render('trackingMessage', {newIdentifier: 'abc' + req.query.page, oldIdentifier: 'abc'});
	}
	else {
		res.render('trackingMessage', {newIdentifier: 'abc', oldIdentifier: '-'});
	}
}