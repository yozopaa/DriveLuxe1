// models/Students.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // This references the User model
    },
    permitType: { 
        type: String, 
        required: true 
    },
    totalAmount: { 
        type: Number, 
        required: true 
    },
    amountPaid: { 
        type: Number, 
        default: 0 
    },
    remainingAmount: { 
        type: Number 
    },

    enrollmentDate: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ['Actif', 'En attente', 'Terminé'],
        default: 'En attente'
    },
    theoreticalProgress: { 
        type: Number, 
        default: 0 
    },
    practicalProgress: { 
        type: Number, 
        default: 0 
    }
}, {
    timestamps: true
});

// Calculate remaining amount before saving
studentSchema.pre('save', function(next) {
    this.remainingAmount = this.totalAmount - this.amountPaid;
    next();
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;