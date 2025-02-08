const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');

router.get('/', async (req, res) => {
    try {
        const lessons = await Lesson.find()
            .populate('student', 'name')
            .sort('start');
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const lesson = new Lesson(req.body);
        const newLesson = await lesson.save();
        res.status(201).json(newLesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;