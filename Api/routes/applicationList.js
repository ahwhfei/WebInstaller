/* API for application lists */
var express = require('express');
var router = express.Router();

var AppList = require('../model/applicationList');

/* GET all application lists. */
router.get('/:customer/applicationLists', function(req, res, next) {
    console.log(req.params.customer);
	res.send('This is get all application lists api.');
});

/* GET an application list according to ListID */
router.get('/:customer/applicationList/:listID', function(req, res, next) {
    console.log(req.params.customer);
	res.send('This is get an application list api.');
});

/* CREATE a new application list */
router.post('/:customer/applicationList', function(req, res, next) {
    console.log(req.params.customer);
	res.send('This is create an application list api.');
});

/* UPDATE an application list */
router.put('/:customer/applicationList/:listID', function(req, res, next) {
    console.log(req.params.customer);
	res.send('This is update an application list api.');
});

/* DELETE an application list according to ListID */
 router.delete('/:customer/applicationList/:listID', function(req, res, next) {
    console.log(req.params.customer);
	res.send('This is delete an application list api.');
});

module.exports = router;
