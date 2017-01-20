var mongoose = require('mongoose');

var AppSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Version: String,
    Message: String,
    Script: String,
    QuitCode: Number,
    Dependency: [{ ID: String }],
    CreateDate: String,
    SourceURL: String,
    Publisher: String,
    DownloadSize: String,
    Icon: String,
    Like: { type: Number, default: 0 },
    Restart: { type: Boolean, default: false },
    Passive: { type: Boolean, default: true },
    Quiet: { type: Boolean, default: true },
    OS: [{ Name: String }]
});

module.exports = mongoose.model('App', AppSchema);
