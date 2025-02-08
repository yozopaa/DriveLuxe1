// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');



// routes/commentRoutes.js
router.get('/', async (req, res) => {
    try {
        console.log('Fetching comments...');
        const comments = await Comment.find()  // Remove status filter for testing
            .sort('-createdAt');
        console.log('Found comments:', comments);
        res.json(comments);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Received comment data:', req.body);
        const comment = new Comment(req.body);
        const savedComment = await comment.save();
        console.log('Saved comment:', savedComment);
        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;