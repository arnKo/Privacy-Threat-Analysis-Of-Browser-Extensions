var express = require('express');
var router = express.Router();

var message = require('./message.js');
var beacon = require('./beacon.js');

router.get('/message', message.get);
router.get('/beacon', beacon.get);

module.exports = router;