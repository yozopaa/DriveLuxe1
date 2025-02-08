// models/Lesson.js
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    lessonType: {
        type: String,
        enum: ['Théorie', 'Pratique'],
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);