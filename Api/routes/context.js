/* API for context */
var express = require('express');
var router = express.Router();

var application = require('../model/context');

/* GET all contexts */
router.get('/:customer/contexts', function(req, res, next) {
    let queryOption = {};
    
    application.find(queryOption, function (err, contexts) {
        if (err) return next(err);
        res.json(contexts);
    })
    .limit(40)
    .sort({count: -1, name: 1});
});

/* GET context detail according to ID or Name */
router.get('/:customer/context/:query', function(req, res, next) {
    if (req.params.query.length === 24) {  // Query by ID
        application.findById(req.params.query, function (err, context) {
            if (err) return next(err);
            res.json(context);
        });
    } else {  // Query by Name
        application.find({Name: req.params.query}, function (err, context) {
            if (err) return next(err);
            res.json(context);
        });
    }
});

/* CREATE OR UPDATE a new context */
router.post('/:customer/context', function(req, res, next) {
    var appListLogs = req.body;

    var guid = {};
    guid['guid'] = appListLogs.guid;

    var defaultLogs={};
    defaultLogs['OsVersion'] = appListLogs.OsVersion;
    defaultLogs['hostName'] = appListLogs.hostName;
    defaultLogs['applicationListId'] = appListLogs.applicationListId;
    defaultLogs['hostIp'] = appListLogs.hostIp;
    defaultLogs['startTime'] = appListLogs.startTime;

    var logs = {};
    logs['applicationLogs'] = appListLogs.applicationLogs;
    logs['applicationListLog'] = appListLogs.applicationListLog;
    logs['endTime'] = appListLogs.endTime;
    logs['executionStatus'] = appListLogs.executionStatus;
    logs['executionDurtion'] = appListLogs.executionDurtion;

    application.update(guid, {$set: logs, $setOnInsert: defaultLogs}, {upsert: true}, err => {
        if (err) return next(err);
        res.send('Update successfully');
    });
});

/* DELETE an context */
router.delete('/:customer/context/:id', function(req, res, next) {
    application.findByIdAndRemove(req.params.id, function (err, context) {
        if (err) return next(err);
        res.send(context);
    });
});

module.exports = router;
