var express = require('express');
var router = express.Router();

var beacon = require('./beacon.js');
var fetch = require('./fetch.js');
var download = require('./download.js');
var spam = require('./spam.js');

router.get('/fetch', fetch.get);

router.get('/download', download.get);

router.get('/spam', spam.get);

router.get('/tracking/beacon', beacon.get);

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
