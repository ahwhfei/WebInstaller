(function () {
    'use strict';

    // Import dependencies
    let express = require('express'),
        router = express.Router();
    
    const http = require('http');
    const request = require('request');
    const config = require('../config');

    var _increaseCount = function (url) {
        request.put(url,
            {json: {$inc: {count: 1}}},
            (err, res, body) => {
            if (!!err) {
                console.error('count increment:', err);
            }
        });
    };

    router.get('/:id', function (req, response) {
        const id = req.params.id;
        const url = config.apiUrl + '/applicationList/' + id;
        let applications = [];

        _increaseCount(url);

        http.get(url, (res) => {
            let rawData = '';
            res.on('data', (chunk) => rawData += chunk);

            res.on('end', () => {
                try {
                    let appList = JSON.parse(rawData);

                    let appUrl = config.apiUrl + '/application/';

                    appList.applications.map(app => {
                        delete app.icon;
                        _increaseCount(appUrl + app._id);
                    });

                    let result = { Applications: appList.applications };

                    response.send(result);
                } catch (e) {
                    console.log(e.message);
                }
            });
        }).on('error', (e) => {
            console.log(`Got error: ${e.message}`);
        });

    });

    module.exports = router;
}());