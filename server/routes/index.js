var express = require('express');
var router = express.Router();

var update = require('./update.js');
var log = require('./log.js');
var login = require('./login.js');
var bank = require('./bank.js');
var tracking = require('./tracking/index.js');

router.get('/login', login.get);
router.post('/login', login.post);

router.post('/log', log.post);
router.get('/log', log.get);

router.post('/update', update.post);

router.get('/bank', bank.get);


router.use('/tracking', tracking);

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
