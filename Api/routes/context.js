/* API for context */
var express = require('express');
var router = express.Router();

var application = require('../model/context');

/* GET all contexts */
router.get('/:customer/contexts', function(req, res, next) {
    let queryOption = {};
    
    application.find(queryOption, function (err, apps) {
        if (err) return next(err);
        res.json(apps);
    })
    .limit(40)
    .sort({count: -1, name: 1});
});

/* GET context detail according to ID or Name */
router.get('/:customer/context/:query', function(req, res, next) {
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

/* CREATE a new context */
router.post('/:customer/context', function(req, res, next) {
    application.create(req.body, function (err, app) {
        if (err) return next(err);
        res.send(app);
    });
});

/* UPDATE an context */
router.put('/:customer/context/:id', function(req, res, next) {
    application.findByIdAndUpdate(req.params.id, req.body, function (err, app) {
        if (err) return next(err);
        res.send('Update successfully');
    });
});

/* DELETE an context */
router.delete('/:customer/context/:id', function(req, res, next) {
    application.findByIdAndRemove(req.params.id, function (err, app) {
        if (err) return next(err);
        res.send(app);
    });
});

module.exports = router;
