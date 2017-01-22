var mongoose = require('mongoose');

var AppListSchema = new mongoose.Schema({
    name: String,
    description: String,
    applications: [{    
        name: String,
        description: String,
        version: String,
        message: String,
        script: String,
        quitCode: Number,
        dependency: [{ id: String }],
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
    }],
    createDate: String,
    customer: String,
    script: String,
    supportedOS: [{ name: String }],
    like: { type: Number, default: 0 }
});

module.exports = mongoose.model('AppList', AppListSchema);
