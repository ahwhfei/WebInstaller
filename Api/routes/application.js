/* API for applications */
var express = require('express');
var router = express.Router();

var application = require('../model/application');

/* GET all applications */
router.get('/:customer/applications', function(req, res, next) {
    application.find(function (err, apps) {
        if (err) return next(err);
        res.json(apps);
    });
});

/* GET application detail according to ID or Name */
router.get('/:customer/application/:query', function(req, res, next) {
    if (req.params.query.length === 24) {  // Query by ID
        application.findById(req.params.query, function (err, app) {
            if (err) return next(err);
            res.json(app);
        });
    } else {  // Query by Name
        application.find({Name: req.params.query}, function (err, app) {
            if (err) return next(err);
            res.json(app);
        });
    }
});

/* CREATE a new application */
router.post('/:customer/application', function(req, res, next) {
    application.create(req.body, function (err, app) {
		if (err) return next(err);
		res.send(app);
	});
});

/* UPDATE an applicaiton */
router.put('/:customer/application/:id', function(req, res, next) {
    application.findByIdAndUpdate(req.params.id, req.body, function (err, app) {
        if (err) return next(err);
        res.send('Update successfully');
    });
});

/* DELETE an applcation */
router.delete('/:customer/application/:id', function(req, res, next) {
    application.findByIdAndRemove(req.params.id, function (err, app) {
        if (err) return next(err);
        res.send(app);
    });
});

module.exports = router;
