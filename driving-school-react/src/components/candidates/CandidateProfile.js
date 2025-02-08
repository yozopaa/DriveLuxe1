// CandidateProfile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    Paper,
    TextField,
} from '@mui/material';

const CandidateProfile = () => {
    const [userData, setUserData] = useState(null);
    const { email } = useParams();

    useEffect(() => {
        fetchUserData();
    }, [email]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/users/${email}`);
            const data = await response.json();
            console.log('Received user data:', data); // Debug log
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    if (!userData) {
        return <Box p={3}>Chargement...</Box>;
    }

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
            <Grid container spacing={3}>
                {/* Profile Card */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Avatar
                                sx={{
                                    width: 120,
                                    height: 120,
                                    margin: '0 auto 20px',
                                    bgcolor: '#f3be00b2'
                                }}
                            >
                                {userData.fullName?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="h5" gutterBottom>
                                {userData.fullName}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Candidat
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Profile Details */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Informations Personnelles
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nom Complet"
                                    value={userData.fullName}
                                    disabled
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={userData.email}
                                    disabled
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Téléphone"
                                    value={userData.phone}
                                    disabled
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Progress Section */}
                    <Paper sx={{ p: 3, mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Progression des cours
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Cours théoriques complétés: {userData.theoreticalProgress || '0'}%
                                </Typography>
                                <Typography variant="body1">
                                    Cours pratiques complétés: {userData.practicalProgress || '0'}%
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CandidateProfile;