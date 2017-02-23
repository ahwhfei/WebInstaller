(function(){
    'use strict';

    const request = require('request');
    const sharp = require('sharp');
    const Stream = require('stream');
    const Rx = require('rxjs/Rx');
    
    const resizeImage = sharp().resize(50);

    var fetchIcon = function (iconUrl) {
        let imageType = '';
        let writeStream = new Stream();
        writeStream.writable = true;

        writeStream.buffer = new Buffer(0);
        
        let observable = Rx.Observable.create(function (observer) {

            writeStream.write = function(buf) {
                writeStream.buffer = Buffer.concat([writeStream.buffer, new Buffer(buf)]);
            }

            writeStream.end = function(buf) {
                if(arguments.length) writeStream.write(buf);

                writeStream.writable = false;
                let toBase64Image = 'data:' + imageType + ';base64,' + writeStream.buffer.toString('base64');

                observer.next(toBase64Image);
            }

            request.get(iconUrl)
                .on('response', response => 
                    imageType = response.headers['content-type']
                )
                .pipe(resizeImage)
                .pipe(writeStream);
        })

        return observable;
    };

    module.exports.fetchIcon = fetchIcon;
}());