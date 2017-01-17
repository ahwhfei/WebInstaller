var mongoose = require('mongoose');

var AppListSchema = new mongoose.Schema({
    "Name": String,
    "Description": String,
    "Applications": Array,
    "CreateDate": String,
    "Customer": String,
    "Script": String,
    "OS": Array,
    "Like": Number
});

module.exports = mongoose.model('AppList', AppListSchema);
