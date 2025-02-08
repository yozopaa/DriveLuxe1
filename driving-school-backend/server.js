// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const studentRoutes = require('./routes/Students');
const paymentRoutes = require('./routes/PaymentsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const testimonialRoutes = require('./routes/testimonialsRoutes')
const monitorRoutes = require('./routes/monitorRoutes');

const lessonRoutes = require('./routes/LessonsRoutes');

const app = express();
const PORT = 5000;

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

mongoose.connect('mongodb+srv://oussamamouatamid1:yozopaaa@cluster0.fpd9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('MongoDB Connection Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/testimonials',testimonialRoutes );
app.use('/api/comments', commentRoutes);
app.use('/api/monitor', monitorRoutes);
app.use('/api/lessons', lessonRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});