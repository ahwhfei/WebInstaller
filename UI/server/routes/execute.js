(function () {
    'use strict';

    // Import dependencies
    let express = require('express'),
        router = express.Router();

    const fs = require('fs');
    const path = require('path');
    const config = require('../config');

    router.get('/:id', function (req, res) {
        const id = req.params.id;

        let psTemplate = fs.readFileSync(path.join(__dirname, 'powershell-template.ps1'))
                            .toString().replace('<<POWERSHELLTEMPLATEID>>', config.host + '/apps/' + id);
        res.send(psTemplate);
    });

    module.exports = router;
}());