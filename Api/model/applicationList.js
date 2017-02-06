var mongoose = require('mongoose');
let Schema = mongoose.Schema;

var appListSchema = new mongoose.Schema({
    name: String,
    description: String,
    applications: [{ type: Schema.Types.ObjectId, ref: 'app' }],
    createDate: { type: Date, default: Date.now },
    customer: String,
    script: String,
    supportedOS: [{ name: String }],
    like: { type: Number, default: 0 }
});

module.exports = mongoose.model('applist', appListSchema);
