let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let contextSchema = new mongoose.Schema({
    applicationListId: string,
    applicationLogs: [{
        applicationId: string, 
        applicationLog: string,
        executionDurtion: number,
        endTime: date,
        executionStatus: string,
        startTime: date
    }],
    applicationListLog: string,
    endTime: date,
    executionDurtion: number,
    executionStatus: string,
    hostName: string,
    hostIp: string,
    startTime: date,
    OsVersion: string
});

module.exports = mongoose.model('context', contextSchema);
