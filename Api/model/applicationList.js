var mongoose = require('mongoose');

var AppListSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Applications: [{    
        Name: String,
        Description: String,
        Version: String,
        Message: String,
        Script: String,
        QuitCode: Number,
        Dependency: [{ID: String}],
        CreateDate: String,
        SourceURL: String,
        Publisher: String,
        DownloadSize: String,
        Icon: String,
        Like: Number,
        Restart: Boolean,
        Passive: Boolean,
        Quiet: Boolean,
        OS: [{Name: String}]
    }],
    CreateDate: String,
    Customer: String,
    Script: String,
    OS: [{Name: String}],
    Like: Number
});

module.exports = mongoose.model('AppList', AppListSchema);
