var mongoose = require('mongoose');

var AppSchema = new mongoose.Schema({
    "Name": String,
    "Description": String,
    "Version": String,
    "Message": String,
    "Script": String,
    "QuitCode": Number,
    "Dependency": [{"ID": String}],
    "CreateDate": String,
    "SourceURL": String,
    "Publisher": String,
    "DownloadSize": String,
    "Icon": String,
    "Like": Number,
    "Restart": Boolean,
    "Passive": Boolean,
    "Quiet": Boolean,
    "OS": [{"Name": String}]
});

module.exports = mongoose.model('App', AppSchema);
