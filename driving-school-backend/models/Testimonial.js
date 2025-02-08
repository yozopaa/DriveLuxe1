// models/Testimonial.js
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
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
        enum: ['En attente', 'Approuvé'],
        default: 'En attente'
    },
    avatar: {
        type: String,
        default: '/default-avatar.jpg'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);