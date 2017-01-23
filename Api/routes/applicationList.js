/* API for application lists */
var express = require('express');
var router = express.Router();

var AppList = require('../model/applicationList');

/* GET all application lists */
router.get('/:customer/applicationLists', function(req, res, next) {
    AppList.find(function (err, appLists) {
        if (err) return next(err);
        res.json(appLists);
    });
});

/* GET an application list according to ID */
router.get('/:customer/applicationList/:id', function(req, res, next) {
    AppList.findById(req.params.id, function (err, appList) {
        if (err) return next(err);
        res.json(appList);
    });
});

/* CREATE a new application list */
router.post('/:customer/applicationList', function(req, res, next) {
    AppList.create(req.body, function (err, appList) {
		if (err) return next(err);
        res.send(appList);
	});
});

/* UPDATE an application list */
router.put('/:customer/applicationList/:id', function(req, res, next) {
    AppList.findByIdAndUpdate(req.params.id, req.body, function (err, appList) {
        if (err) return next(err);
        res.send('Update successfully');
    });
});

/* DELETE an application list */
 router.delete('/:customer/applicationList/:id', function(req, res, next) {
    AppList.findByIdAndRemove(req.params.id, function (err, appList) {
        if (err) return next(err);
        res.send('Delete successfully');
    });
});

module.exports = router;
