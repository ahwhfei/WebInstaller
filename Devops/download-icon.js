(function(){
    'use strict';

    const request = require('request');
    const fs = require('fs');
    const sharp = require('sharp');

    // Exist bug: can't support call multiple times
    let downloadIcon = function (iconUrl, filename) {
        let resizeImage = sharp().resize(128);
        console.log(iconUrl);
        try {
            request.get(iconUrl)
                .on('error', err => {})
                .pipe(resizeImage)
                .pipe(fs.createWriteStream(filename));
        } catch (exception) {}
    }

    let convertIconToBase64 = function (iconUrl) {

        return new Promise((resolve, reject) => {
            request.get(iconUrl, {encoding: null}, (error, response, body) => {
                if(!!error || response.statusCode !== 200) {
                    reject(`Status Code ${response.statusCode}`);
                }

                sharp(new Buffer(body)).resize(128).toBuffer()
                    .then(buffer => {
                        let toBase64Image = 'data:image/png;base64,' + new Buffer(body).toString('base64');
                        resolve(toBase64Image);
                    }, reason => reject(reason));
            });
        });
    }

    module.exports.downloadIcon = downloadIcon;
    module.exports.convertIconToBase64 = convertIconToBase64;
}());