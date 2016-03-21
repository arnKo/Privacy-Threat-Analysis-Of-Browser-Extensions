var identifier = 'Asdasd';

module.exports.get1 = function(req, res, next) {
	res.render('tracking', {newIdentifier: identifier, oldIdentifier: '-'});
}

module.exports.get2 = function(req, res, next) {
	res.render('tracking', {newIdentifier: '--', oldIdentifier: identifier});
}