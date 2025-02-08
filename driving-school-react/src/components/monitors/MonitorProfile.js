import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Avatar, Grid, Button, Paper } from '@mui/material';

const MonitorProfile = () => {
    const [userData, setUserData] = useState(null);
    const { email } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/auth/users/${email}`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [email]);

    if (!userData) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Avatar
                                sx={{ width: 120, height: 120, margin: '0 auto 20px' }}
                                src={userData.image || '/default-avatar.png'}
                            />
                            <Typography variant="h5" gutterBottom>
                                {userData.fullName}
                            </Typography>
                            <Typography color="textSecondary">
                                Driving Instructor
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ mt: 2, bgcolor: '#f3be00b2' }}
                            >
                                Edit Profile
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Professional Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Email
                                </Typography>
                                <Typography variant="body1">
                                    {userData.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    License Number
                                </Typography>
                                <Typography variant="body1">
                                    {userData.licenseNumber || 'Not provided'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Years of Experience
                                </Typography>
                                <Typography variant="body1">
                                    {userData.experience || 'Not provided'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Specialization
                                </Typography>
                                <Typography variant="body1">
                                    {userData.specialization || 'Not provided'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper sx={{ p: 3, mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Schedule Overview
                        </Typography>
                        {/* Add schedule/calendar component here */}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MonitorProfile;