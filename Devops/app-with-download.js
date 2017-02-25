(function(){
    'use strict';
    let https = require('https');
    let fs = require('fs');
    let parseString = require('xml2js').parseString;
    let download = require('./download-icon');

    const microsoftWebPiUrl = 'https://www.microsoft.com/web/webpi/5.0/WebProductList.xml';
    const webPiXmlFile = 'WebProductList.xml';
    const webPiJsonFile = 'WebProductList.json';
    const webPiDbFile = 'apps.webpi.json';

    console.time('Cost time');
    console.log('Waiting...');

    https.get(microsoftWebPiUrl, (res) => {
        const statusCode = res.statusCode;
        const contentType = res.headers['content-type'];

        let error;
        
        if (statusCode !== 200) {
            error = new Error(`Request Failed.\n` +
                    `Status Code: ${statusCode}`);
        } else if (!/^text\/xml/.test(contentType)) {
            error = new Error(`Invalid content-type.\n` +
                    `Expected text/xml but received ${contentType}`);
        }

        if (error) {
            console.log(error.message);
            // consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';

        res.on('data', (chunk) => rawData += chunk);

        res.on('end', () => {
            try {
                // let parsedData = JSON.parse(rawData);
                // console.log(parsedData);
                // console.log(rawData);
                fs.writeFile(webPiXmlFile, rawData);

                parseString(rawData, {
                        explicitArray: false,
                        trim: true
                    }, (err, result) => {
                    fs.writeFile(webPiJsonFile, JSON.stringify(result));

                    let entry = result.feed.entry;
                    let count = 0;
                    
                    fs.writeFileSync(webPiDbFile, '');

                    for (let i = 0; i < entry.length; i++) {
                        let element = entry[i];
                        let document = {};
                        if (!element.productId) {
                            continue;
                        }

                        document.script = 'webpicmd /install /products:' + element.productId;

                        if (!!element.metadata) {
                            if (!element.metadata.title) {
                                continue;
                            }

                            document.name = (typeof element.metadata.title === 'object' ? element.metadata.title['_'] : element.metadata.title);

                            if (!!element.metadata.images && !!element.metadata.images.icon) {
                                document.icon = element.metadata.images.icon;
                            }

                            !!element.metadata.version && (document.version = element.metadata.version);

                            !!element.metadata.longSummary
                                && (document.description = (typeof element.metadata.longSummary === 'object' 
                                        ? element.metadata.longSummary['_'] : element.metadata.longSummary));

                        } else {
                            if (!element.title) {
                                continue;
                            }

                            document.name = (typeof element.title === 'object' ? element.title['_'] : element.title);
                            if (!!element.images && !!element.images.icon) {
                                document.icon = element.images.icon;
                            }

                            !!element.version && (document.version = element.version);

                            !!element.longSummary
                                && (document.description = (typeof element.longSummary === 'object' 
                                        ? element.longSummary['_'] : element.longSummary));
                        }

                        if (!!document.icon) {
                            download.convertIconToBase64(document.icon).then(
                                base64Image => {
                                    document.icon = base64Image;
                                    fs.appendFileSync(webPiDbFile, JSON.stringify(document));
                                    count++;
                                }, (err) => {
                                    console.log(err);
                                    delete document.icon;
                                    fs.appendFileSync(webPiDbFile, JSON.stringify(document));
                                    count++;
                                }
                            )
                        } else {
                            fs.appendFileSync(webPiDbFile, JSON.stringify(document));
                            count++;
                        }
                    }

                    console.log('Done: there are ' + count + ' db documents.');
                    console.timeEnd('Cost time');
                });

            } catch (e) {
                console.log(e.message);
            }
        });
    })
    .on('error', (e) => {
        console.log(`Got error: ${e.message}`);
    });
})();