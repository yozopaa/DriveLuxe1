import React, { useState, useEffect } from 'react';
import { 
    Box, Grid, Card, CardContent, Typography, Paper, 
    CircularProgress, Alert, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow 
} from '@mui/material';
import { CalendarMonth, People, Assessment } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const MonitorDashboard = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        students: [],
        upcomingSessions: [],
        completedSessions: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { email } = useParams();

    // ... keep your existing useEffect and fetch logic ...

    const SessionsTable = ({ sessions, title }) => (
        <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2 }}>
                {title}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f3be00b2' }}>
                        <TableCell sx={{ color: 'white' }}>Étudiant</TableCell>
                        <TableCell sx={{ color: 'white' }}>Date</TableCell>
                        <TableCell sx={{ color: 'white' }}>Heure</TableCell>
                        <TableCell sx={{ color: 'white' }}>Type de Cours</TableCell>
                        <TableCell sx={{ color: 'white' }}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions.map((session) => (
                        <TableRow key={session._id}>
                            <TableCell>{session.student?.name || 'N/A'}</TableCell>
                            <TableCell>{new Date(session.start).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(session.start).toLocaleTimeString()}</TableCell>
                            <TableCell>{session.lessonType}</TableCell>
                            <TableCell>{session.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const StudentsTable = ({ students }) => (
        <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2 }}>
                Étudiants Actifs
            </Typography>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f3be00b2' }}>
                        <TableCell sx={{ color: 'white' }}>Nom</TableCell>
                        <TableCell sx={{ color: 'white' }}>Email</TableCell>
                        <TableCell sx={{ color: 'white' }}>Type de Permis</TableCell>
                        <TableCell sx={{ color: 'white' }}>Progrès Théorique</TableCell>
                        <TableCell sx={{ color: 'white' }}>Progrès Pratique</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student._id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.permitType}</TableCell>
                            <TableCell>{student.theoreticalProgress}%</TableCell>
                            <TableCell>{student.practicalProgress}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    // ... keep your existing stats cards ...

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            {/* ... your existing stats cards ... */}

            <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12}>
                    <StudentsTable students={stats.students} />
                </Grid>
                
                <Grid item xs={12}>
                    <SessionsTable 
                        sessions={stats.upcomingSessions} 
                        title="Sessions à Venir" 
                    />
                </Grid>

                <Grid item xs={12}>
                    <SessionsTable 
                        sessions={stats.completedSessions} 
                        title="Sessions Terminées" 
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MonitorDashboard;