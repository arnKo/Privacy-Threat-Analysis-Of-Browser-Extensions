module.exports.get = function(req, res, next) {
	res.render('login');
}

module.exports.post = function(req, res, next) {
	res.render('index',{ title: 'Login Success' })
}