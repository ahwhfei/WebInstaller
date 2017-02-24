(function(){
    'use strict';

    const request = require('request');
    const fs = require('fs');
    const sharp = require('sharp');

    const resizeImage = sharp().resize(128);

    var downloadIcon = function (iconUrl, filename) {
        request.get(iconUrl)
            .pipe(resizeImage)
            .pipe(fs.createWriteStream(filename));
    }

    module.exports.downloadIcon = downloadIcon;
}());