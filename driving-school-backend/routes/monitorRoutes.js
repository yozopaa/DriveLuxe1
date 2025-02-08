// routes/monitorRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Students');
const Lesson = require('../models/Lesson');

// routes/monitorRoutes.js
router.get('/stats/:monitorId', async (req, res) => {
    try {
        // Get students
        const students = await Student.find({
            instructor: req.params.monitorId,
            status: 'Actif'
        });

        // Get upcoming sessions
        const upcomingSessions = await Lesson.find({
            instructor: req.params.monitorId,
            start: { $gte: new Date() },
            status: 'Planifié'
        }).populate('student', 'name');

        // Get completed sessions
        const completedSessions = await Lesson.find({
            instructor: req.params.monitorId,
            status: 'Terminé'
        }).populate('student', 'name');

        res.json({
            totalStudents: students.length,
            students: students,
            upcomingSessions: upcomingSessions,
            upcomingSessionsCount: upcomingSessions.length,
            completedSessions: completedSessions,
            completedSessionsCount: completedSessions.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;