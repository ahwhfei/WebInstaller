(function(){
    'use strict';

    var express = require('express'),
        path = require('path'),
        app = express();

    app.use(express.static(path.join(__dirname, '../dist')));

    // For resolve Angular enable HTML5 mode page refresh without 404 error
    app.get('*', function(req, res) {
        res.sendFile(path.resolve('../dist/index.html'));
    });

    module.exports = app;
}());