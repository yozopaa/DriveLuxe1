// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Get user profile
router.get('/users/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
            .select('-password'); // Exclude password from response
        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Update user profile
router.put('/users/:email', async (req, res) => {
    try {
        const { fullName, phone } = req.body;
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Update fields
        user.fullName = fullName || user.fullName;
        user.phone = phone || user.phone;

        await user.save();
        res.json({
            message: 'Profil mis à jour avec succès',
            user: {
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
    }
});

// Sign up route
router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password, phone, role = 'candidate' } = req.body;
        
        // Validate input
        if (!fullName || !email || !password || !phone) {
            return res.status(400).json({ 
                message: 'Tous les champs sont requis' 
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Cet email est déjà utilisé' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({ 
            message: 'Inscription réussie' 
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            message: 'Erreur serveur' 
        });
    }
});
// In your auth.js routes file

// Get users by role
router.get('/users-by-role/:role', async (req, res) => {
    try {
        const users = await User.find({ role: req.params.role })
            .select('-password')  // Exclude password from response
            .sort({ fullName: 1 }); // Sort by name alphabetically
        
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users by role:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
});
router.get('/users/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
            .select('-password'); // Exclude password but include all other fields
        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Make sure we're sending all necessary fields
        res.status(200).json({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone || 'Non renseigné', // Provide default value if phone is missing
            role: user.role,
            theoreticalProgress: user.theoreticalProgress || 0,
            practicalProgress: user.practicalProgress || 0
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});
// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: 'Email ou mot de passe invalide' 
            });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ 
                message: 'Email ou mot de passe invalide' 
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            'autoecole',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                name: user.fullName,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Erreur serveur' 
        });
    }
});

module.exports = router;