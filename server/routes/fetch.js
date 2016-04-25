var express = require('express');
var router = express.Router();

module.exports.get = function(req, res, next) {
	res.render('fetch');
}
