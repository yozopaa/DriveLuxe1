// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }, // Make sure phone field is required
    role: { 
        type: String, 
        enum: ['candidate', 'trainer', 'assistant', 'admin'], 
        required: true 
    },
    theoreticalProgress: { type: Number, default: 0 },
    practicalProgress: { type: Number, default: 0 },
    
},{timestamps:true});

const User = mongoose.model('User', userSchema);
module.exports = User;