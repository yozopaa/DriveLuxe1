import React, { useState, useEffect } from 'react';
import { 
    Box, Grid, Card, CardContent, Typography, Paper, 
    CircularProgress, Alert, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, LinearProgress 
} from '@mui/material';
import { CalendarMonth, People, Assessment, School } from '@mui/icons-material';
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

    useEffect(() => {
        fetchMonitorStats();
    }, [email]);

    const fetchMonitorStats = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/monitor/stats/${email}`);
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des données');
            }
            const data = await response.json();
            setStats(data);
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={3}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Tableau de Bord Moniteur
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <People sx={{ fontSize: 40, color: '#f3be00b2', mr: 2 }} />
                                <Box>
                                    <Typography variant="h5">
                                        {stats.totalStudents}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Étudiants Actifs
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarMonth sx={{ fontSize: 40, color: '#f3be00b2', mr: 2 }} />
                                <Box>
                                    <Typography variant="h5">
                                        {stats.upcomingSessions.length}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Sessions à Venir
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Assessment sx={{ fontSize: 40, color: '#f3be00b2', mr: 2 }} />
                                <Box>
                                    <Typography variant="h5">
                                        {stats.completedSessions.length}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Sessions Terminées
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Students Table */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Étudiants Actifs
                        </Typography>
                        <TableContainer>
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
                                    {stats.students.map((student) => (
                                        <TableRow key={student._id}>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.email}</TableCell>
                                            <TableCell>{student.permitType}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{ width: '100%', mr: 1 }}>
                                                        <LinearProgress 
                                                            variant="determinate" 
                                                            value={student.theoreticalProgress} 
                                                            sx={{
                                                                height: 10,
                                                                borderRadius: 5,
                                                                backgroundColor: '#f5f5f5',
                                                                '& .MuiLinearProgress-bar': {
                                                                    backgroundColor: '#f3be00b2'
                                                                }
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box sx={{ minWidth: 35 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {`${student.theoreticalProgress}%`}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{ width: '100%', mr: 1 }}>
                                                        <LinearProgress 
                                                            variant="determinate" 
                                                            value={student.practicalProgress} 
                                                            sx={{
                                                                height: 10,
                                                                borderRadius: 5,
                                                                backgroundColor: '#f5f5f5',
                                                                '& .MuiLinearProgress-bar': {
                                                                    backgroundColor: '#f3be00b2'
                                                                }
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box sx={{ minWidth: 35 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {`${student.practicalProgress}%`}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                {/* Upcoming Sessions */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Sessions à Venir
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f3be00b2' }}>
                                        <TableCell sx={{ color: 'white' }}>Étudiant</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Date</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Heure</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Type de Cours</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stats.upcomingSessions.map((session) => (
                                        <TableRow key={session._id}>
                                            <TableCell>{session.student?.name || 'N/A'}</TableCell>
                                            <TableCell>
                                                {new Date(session.start).toLocaleDateString('fr-FR')}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(session.start).toLocaleTimeString('fr-FR')}
                                            </TableCell>
                                            <TableCell>{session.lessonType}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MonitorDashboard;