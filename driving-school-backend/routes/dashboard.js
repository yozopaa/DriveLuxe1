// routes/dashboard.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Student = require('../models/Students');
const Payment = require('../models/payment');
const Lesson = require('../models/Lesson');

router.get('/stats', async (req, res) => {
    try {
        // Get counts
        const studentsCount = await Student.countDocuments();
        const trainersCount = await User.countDocuments({ role: 'trainer' });
        const assistantsCount = await User.countDocuments({ role: 'assistant' });
        const staffCount = trainersCount + assistantsCount;

        // Get total payments
        const totalAmount = await Payment.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Get upcoming lessons without populate for now
        const upcomingLessons = await Lesson.find({
            start: { $gte: new Date() }
        })
        .sort('start')
        .limit(3);

        // Get student status distribution
        const studentStatuses = await Student.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get monthly payment data
        const monthlyPayments = await Payment.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" }
                    },
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            { $limit: 6 }
        ]);

        // Get monthly student enrollment
        const monthlyEnrollments = await Student.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$enrollmentDate" },
                        year: { $year: "$enrollmentDate" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            { $limit: 6 }
        ]);

        res.json({
            counts: {
                students: studentsCount,
                staff: staffCount,
                totalAmount: totalAmount[0]?.total || 0
            },
            upcomingLessons,
            studentStatuses,
            monthlyPayments,
            monthlyEnrollments
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ message: 'Erreur lors du chargement des statistiques' });
    }
});

module.exports = router;