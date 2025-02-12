// routes/monitorRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Student = require('../models/Students');
const Lesson = require('../models/Lesson');

// Get monitor's statistics and data
router.get('/stats/:email', async (req, res) => {
    try {
        // Get monitor's info
        const monitor = await User.findOne({ email: req.params.email });
        if (!monitor) {
            return res.status(404).json({ message: 'Moniteur non trouvé' });
        }

        // Get monitor's students
        const students = await Student.find({ instructor: monitor._id })
            .select('name email permitType theoreticalProgress practicalProgress');

        // Get upcoming sessions
        const upcomingSessions = await Lesson.find({
            student: { $in: students.map(s => s._id) },
            start: { $gte: new Date() }
        })
        .populate('student', 'name')
        .sort('start');

        // Get completed sessions
        const completedSessions = await Lesson.find({
            student: { $in: students.map(s => s._id) },
            start: { $lt: new Date() }
        })
        .populate('student', 'name')
        .sort('-start')
        .limit(10); // Limit to last 10 completed sessions

        res.json({
            totalStudents: students.length,
            students,
            upcomingSessions,
            completedSessions
        });
    } catch (error) {
        console.error('Monitor stats error:', error);
        res.status(500).json({ message: 'Erreur lors du chargement des statistiques' });
    }
});

// Update student progress
router.patch('/student-progress/:studentId', async (req, res) => {
    try {
        const { theoreticalProgress, practicalProgress } = req.body;
        const student = await Student.findByIdAndUpdate(
            req.params.studentId,
            { 
                theoreticalProgress, 
                practicalProgress 
            },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get monitor's students
router.get('/students/:monitorId', async (req, res) => {
    try {
        const students = await Student.find({ instructor: req.params.monitorId })
            .select('name email permitType theoreticalProgress practicalProgress');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get monitor's lessons for a specific student
router.get('/lessons/:studentId', async (req, res) => {
    try {
        const lessons = await Lesson.find({ student: req.params.studentId })
            .populate('student', 'name')
            .sort('start');
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;