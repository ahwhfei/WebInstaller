/* API for applications */
var express = require('express');
var router = express.Router();

var App = require('../model/application');

/* GET all applications. */
router.get('/:customer/applications', function(req, res, next) {
    console.log(req.params.customer);
	res.send('This is get all applications api.');
});

/* GET application detail according to application ID */
router.get('/:customer/application/:applicationID', function(req, res, next) {
    console.log(req.params.customer);
	res.send('This is get a application according to ID api.');
});

/* GET applciaiton details according to application Name */
router.get('/:customer/application/:applicationName', function(req, res, next) {
    console.log(req.params.customer);
	res.send('This is get a application according to Name api.');
});

/* CREATE a new application */
router.post('/:customer/application', function(req, res, next) {
    console.log(req.params.customer);
	res.send('This is create a new application api.');
});

/* UPDATE a specific applicaiton details */
router.put('/:customer/application/:applciationID', function(req, res, next) {
    console.log(req.params.customer);
	res.send('This is update a application api.');
});

/* DELETE one applcation accroding to applciationID */
router.delete('/:customer/application/:applciationID', function(req, res, next) {
    console.log(req.params.customer);
	res.send('This is delete a application api.');
});

module.exports = router;
