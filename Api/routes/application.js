/* API for applications */
var express = require('express');
var router = express.Router();

var App = require('../model/application');

/* GET all applications. */
router.get('/:customer/applications', function(req, res, next) {
    App.find(function (err, apps) {
        if (err) return next(err);
        res.json(apps);
    });
});

/* GET application detail according to ID or Name */
router.get('/:customer/application/:query', function(req, res, next) {
    if (req.params.query.length === 24) {  // Query by ID
        App.findById(req.params.query, function (err, app) {
            if (err) return next(err);
            res.json(app);
        });
    } else {  // Query by Name
        App.find({Name: req.params.query}, function (err, app) {
            if (err) return next(err);
            res.json(app);
        });
    }
});

/* CREATE a new application */
router.post('/:customer/application', function(req, res, next) {
    App.create(req.body, function (err, app) {
		if (err) return next(err);
		res.send('Create successfully');
	});
});

/* UPDATE a specific applicaiton details */
router.put('/:customer/application/:id', function(req, res, next) {
    App.findByIdAndUpdate(req.params.id, req.body, function (err, app) {
        if (err) return next(err);
        res.send('Update successfully');
    });
});

/* DELETE one applcation accroding to applciationID */
router.delete('/:customer/application/:id', function(req, res, next) {
    App.findByIdAndRemove(req.params.id, function (err, app) {
        if (err) return next(err);
        res.send('Delete successfully');
    });
});

module.exports = router;
