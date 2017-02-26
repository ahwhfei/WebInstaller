(function(){
    'use strict';

    const request = require('request');
    const sharp = require('sharp');

    let convertIconToBase64 = function (iconUrl) {

        return new Promise((resolve, reject) => {
            request.get(iconUrl, {encoding: null}, (error, response, body) => {
                if(!!error || response.statusCode !== 200) {
                    reject(`Status Code ${response.statusCode}`);
                }

                sharp(new Buffer(body)).resize(128).toBuffer()
                    .then(buffer => {
                        let toBase64Image = 'data:image/png;base64,' + new Buffer(buffer).toString('base64');
                        resolve(toBase64Image);
                    }, reason => reject(reason));
            });
        });
    }

    module.exports.convertIconToBase64 = convertIconToBase64;
}());