(function(){
    'use strict';

    var express = require('express'),
        path = require('path'),
        app = express(),
        execute = require('./routes/execute'),
        apps = require('./routes/apps');

    app.use(express.static(path.join(__dirname, '../dist')));

    app.use('/apps', apps);
    app.use('/execute', execute);

    // For resolve Angular enable HTML5 mode page refresh without 404 error
    app.get('*', function(req, res) {
        res.sendFile(path.resolve('../dist/index.html'));
    });

    module.exports = app;
}());