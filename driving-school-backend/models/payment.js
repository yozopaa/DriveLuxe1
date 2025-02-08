// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['Inscription', 'Mensualité', 'Examen', 'Autre'],
        required: true
    },
    status: {
        type: String,
        enum: ['Payé', 'En attente', 'Annulé'],
        default: 'Payé'
    },
    method: {
        type: String,
        enum: ['Espèces', 'Carte', 'Virement', 'Chèque'],
        required: true
    },
    notes: String
}, {
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;