(function () {
    'use strict';

    // Import dependencies
    let express = require('express'),
        router = express.Router();
    
    const http = require('http');
    const config = require('../config');

    router.get('/:id', function (req, response) {
        const id = req.params.id;
        const url = config.apiUrl + '/applicationList/' + id;
        let applications = [];

        http.get(url, (res) => {
            let rawData = '';
            res.on('data', (chunk) => rawData += chunk);

            res.on('end', () => {
                try {
                    let appList = JSON.parse(rawData);

                    appList.applications.map(app => delete app.icon);

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