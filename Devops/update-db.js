var MongoClient = require('mongodb').MongoClient, 
    download = require('./download-icon');

// Connection URL
var url = 'mongodb://installerapi.eng.citrite.net:8080/InstallerForDevelop';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");

    var apps = db.collection('apps');

    apps.find({}).each(function(err, app) {
        !!err && console.log(err);

        if (!app) {
            db.close();
            return false;
        } 

        if (!!app.icon && (app.icon.indexOf('http') >=0)) {
            download.convertIconToBase64(app.icon).then(
                base64Image => {
                    apps.findOneAndUpdate({_id: app._id}, 
                        {$set: {icon: base64Image}},
                        {returnOriginal: false},
                        (err, r) => {
                            !!err && console.log(err);
                        });
                },
                err => {
                    console.error(err);
                    apps.findOneAndUpdate({_id: app._id}, 
                        {$unset: {icon: ''}},
                        {returnOriginal: false},
                        (err, r) => {
                            !!err && console.log(err);
                        });
                }
            );
        }

        return true;
    });
});