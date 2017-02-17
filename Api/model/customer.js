var mongoose = require('mongoose');
let Schema = mongoose.Schema;

var customerSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    type: { type: String, default: 'Normal' },
    applications: [{ type: Schema.Types.ObjectId, ref: 'app' }],
    applicationLists: [{ type: Schema.Types.ObjectId, ref: 'applist' }],
    createDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('customer', customerSchema);
