var oneYear = 1000 * 60 * 60 * 24 * 365;

module.exports.get = function(req, res, next) {
	if(req.cookies.tracking) {
		console.log('tracking pixel successfull');
	}
	else {
		res.cookie('tracking', 1, { maxAge: oneYear});
	}
	res.render('trackingBeacon');
}