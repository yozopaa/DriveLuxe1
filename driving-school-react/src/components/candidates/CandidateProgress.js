import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, LinearProgress, Grid, Card, CardContent } from '@mui/material';

const CandidateProgress = () => {
    const [progress, setProgress] = useState({
        theory: 75,
        practical: 60,
        overall: 68
    });

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Learning Progress
                        </Typography>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">Theory Progress</Typography>
                                        <LinearProgress 
                                            variant="determinate" 
                                            value={progress.theory}
                                            sx={{ 
                                                height: 10, 
                                                mt: 2,
                                                bgcolor: '#f3be00b2'
                                            }}
                                        />
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            {progress.theory}% Complete
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">Practical Progress</Typography>
                                        <LinearProgress 
                                            variant="determinate" 
                                            value={progress.practical}
                                            sx={{ 
                                                height: 10, 
                                                mt: 2,
                                                bgcolor: '#f3be00b2'
                                            }}
                                        />
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            {progress.practical}% Complete
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">Overall Progress</Typography>
                                        <LinearProgress 
                                            variant="determinate" 
                                            value={progress.overall}
                                            sx={{ 
                                                height: 10, 
                                                mt: 2,
                                                bgcolor: '#f3be00b2'
                                            }}
                                        />
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            {progress.overall}% Complete
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CandidateProgress;
