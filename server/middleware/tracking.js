var users = {};

function createCookie(res) {
	var identifier = Math.random().toString().substring(2);
	res.cookie('express', identifier,  { maxAge: 900000, httpOnly: true });
	users[identifier] = [];
}

module.exports = function(req, res, next) {
	
	var cookie = req.cookies.express;
	
	if(cookie === undefined) {
		createCookie(res);
	}
	else {
		if(users[cookie] === undefined) {
			createCookie(res);
		}
		else {
			if(users[cookie].indexOf(req.header('Referer')) === -1) {
				users[cookie].push(req.header('Referer'));
			}
			
				console.log('tracked user');
				console.log(users[cookie]);
		}
	}
	next();
}