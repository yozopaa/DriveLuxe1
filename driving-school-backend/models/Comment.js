// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);