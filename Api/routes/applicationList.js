/* API for application lists */
var express = require('express');
var router = express.Router();

var applicationList = require('../model/applicationList');

/* GET all application lists */
router.get('/:customer/applicationLists', function(req, res, next) {
    applicationList.find()
        .populate('applications')
        .exec(function (err, appLists) {
            if (err) return next(err);
            res.json(appLists);
        });
});

/* GET an application list according to ID */
router.get('/:customer/applicationList/:id', function(req, res, next) {
    applicationList.findById(req.params.id)
        .populate('applications')
        .exec(function (err, appList) {
            if (err) return next(err);
            res.json(appList);
    });
});

/* CREATE a new application list */
router.post('/:customer/applicationList', function(req, res, next) {
    applicationList.create(req.body, function (err, appList) {
		if (err) return next(err);
        res.send(appList);
	});
});

/* UPDATE an application list */
router.put('/:customer/applicationList/:id', function(req, res, next) {
    applicationList.findByIdAndUpdate(req.params.id, req.body, function (err, appList) {
        if (err) return next(err);
        res.send('Update successfully');
    });
});

/* DELETE an application list */
 router.delete('/:customer/applicationList/:id', function(req, res, next) {
    applicationList.findByIdAndRemove(req.params.id, function (err, appList) {
        if (err) return next(err);
        res.send(appList);
    });
});

module.exports = router;
