
// routes/paymentsRoutes.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const Student = require('../models/Students');

// Get all payments
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('student', 'name email')
            .sort('-date');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new payment
router.post('/add', async (req, res) => {
    try {
        const { studentId, amount, type, method, notes } = req.body;

        // Verify student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }

        const payment = new Payment({
            student: studentId,
            amount,
            type,
            method,
            notes,
            status: 'Payé'
        });

        const newPayment = await payment.save();

        // Update student's amountPaid
        student.amountPaid += amount;
        student.remainingAmount = student.totalAmount - student.amountPaid;
        await student.save();

        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update payment
router.patch('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Paiement non trouvé' });
        }

        const oldAmount = payment.amount;
        const newAmount = req.body.amount;
        const difference = newAmount - oldAmount;

        // Update payment
        Object.assign(payment, req.body);
        const updatedPayment = await payment.save();

        // Update student's amountPaid
        if (difference !== 0) {
            const student = await Student.findById(payment.student);
            student.amountPaid += difference;
            student.remainingAmount = student.totalAmount - student.amountPaid;
            await student.save();
        }

        res.json(updatedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete payment
// routes/paymentsRoutes.js
router.delete('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Paiement non trouvé' });
        }

        // Update student's amountPaid
        const student = await Student.findById(payment.student);
        if (student) {
            student.amountPaid -= payment.amount;
            student.remainingAmount = student.totalAmount - student.amountPaid;
            await student.save();
        }

        // Use findByIdAndDelete instead of remove
        await Payment.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Paiement supprimé avec succès' });
    } catch (error) {
        console.error('Delete payment error:', error); // Add debug log
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;