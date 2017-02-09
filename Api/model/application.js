var mongoose = require('mongoose');

var appSchema = new mongoose.Schema({
    name: String,
    description: String,
    version: String,
    message: String,
    script: String,
    scriptFile: String,
    quitCode: Number,
    dependency: [{ id: String }],
    createDate: { type: Date, default: Date.now },
    sourceURL: String,
    publisher: String,
    downloadSize: String,
    icon: String,
    like: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    restart: { type: Boolean, default: false },
    passive: { type: Boolean, default: true },
    quiet: { type: Boolean, default: true },
    supportedOS: [{ name: String }]
});

module.exports = mongoose.model('app', appSchema);
