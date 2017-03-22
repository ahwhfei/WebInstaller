let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let contextSchema = new mongoose.Schema({
    applicationListId: String,
    applicationLogs: [{
        applicationId: String, 
        applicationLog: String,
        executionDurtion: Number,
        endTime: Date,
        executionStatus: String,
        startTime: Date
    }],
    applicationListLog: String,
    endTime: Date,
    executionDurtion: Number,
    executionStatus: String,
    hostName: String,
    hostIp: String,
    startTime: Date,
    OsVersion: String
});

module.exports = mongoose.model('context', contextSchema);
