var mongoose = require('mongoose');

var AppSchema = new mongoose.Schema({
    name: String,
    description: String,
    version: String,
    message: String,
    script: String,
    quitCode: Number,
    dependency: [{ ID: String }],
    createDate: String,
    sourceURL: String,
    publisher: String,
    downloadSize: String,
    icon: String,
    like: { type: Number, default: 0 },
    restart: { type: Boolean, default: false },
    passive: { type: Boolean, default: true },
    quiet: { type: Boolean, default: true },
    supportedOS: [{ name: String }]
});

module.exports = mongoose.model('App', AppSchema);
