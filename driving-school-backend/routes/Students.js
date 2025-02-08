// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Students');

// Get all students
// routes/students.js
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all students...'); // Debug log
        const students = await Student.find()
            .select('-__v') // Exclude version field
            .sort('-createdAt');
        
        console.log('Found students:', students.length); // Debug log
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: error.message });
    }
});

// Add new student
router.post('/add', async (req, res) => {
    try {
        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            age: Number(req.body.age),
            permitType: req.body.permitType,
            totalAmount: Number(req.body.totalAmount),
            amountPaid: Number(req.body.amountPaid),
            instructor: req.body.instructor,
            enrollmentDate: new Date(req.body.enrollmentDate),
            status: 'Actif',
            remainingAmount: Number(req.body.totalAmount) - Number(req.body.amountPaid)
        });

        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update student
router.patch('/:id', async (req, res) => {
    try {
        const updates = {
            ...req.body,
            age: Number(req.body.age),
            totalAmount: Number(req.body.totalAmount),
            amountPaid: Number(req.body.amountPaid),
            remainingAmount: Number(req.body.totalAmount) - Number(req.body.amountPaid)
        };

        const student = await Student.findByIdAndUpdate(
            req.params.id, 
            updates,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }
        res.json({ message: 'Étudiant supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;