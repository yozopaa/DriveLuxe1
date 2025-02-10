// /assistants/AssistantDashboard.js
import React, { useState } from 'react';
import { 
    Box, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Paper, 
    Button, 
    List, 
    ListItem, 
    ListItemText, 
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { Schedule, Assignment, Notifications, People } from '@mui/icons-material';

const AssistantDashboard = () => {
    const [tasks] = useState([
        { id: 1, title: 'Process new student registrations', deadline: '2024-02-05', status: 'Pending' },
        { id: 2, title: 'Update course schedules', deadline: '2024-02-06', status: 'In Progress' },
        { id: 3, title: 'Respond to student inquiries', deadline: '2024-02-07', status: 'Completed' },
    ]);

    const [notifications] = useState([
        { id: 1, message: 'New student registration received', time: '2 hours ago' },
        { id: 2, message: 'Schedule update required', time: '3 hours ago' },
        { id: 3, message: 'Payment confirmation pending', time: '5 hours ago' },
    ]);

    const [recentStudents] = useState([
        { id: 1, name: 'John Doe', status: 'Enrolled', date: '2024-02-01' },
        { id: 2, name: 'Jane Smith', status: 'Pending', date: '2024-02-02' },
        { id: 3, name: 'Mike Johnson', status: 'Enrolled', date: '2024-02-03' },
    ]);

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Assistant Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Daily Tasks */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Assignment sx={{ fontSize: 30, color: '#f3be00b2', mr: 1 }} />
                                <Typography variant="h6">
                                    Daily Tasks
                                </Typography>
                            </Box>
                            <List>
                                {tasks.map((task) => (
                                    <React.Fragment key={task.id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={task.title}
                                                secondary={`Deadline: ${task.deadline} | Status: ${task.status}`}
                                            />
                                            <Button 
                                                variant="contained" 
                                                size="small"
                                                sx={{ bgcolor: '#f3be00b2' }}
                                            >
                                                Update
                                            </Button>
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Notifications */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Notifications sx={{ fontSize: 30, color: '#f3be00b2', mr: 1 }} />
                                <Typography variant="h6">
                                    Notifications
                                </Typography>
                            </Box>
                            <List>
                                {notifications.map((notification) => (
                                    <React.Fragment key={notification.id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={notification.message}
                                                secondary={notification.time}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Students */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <People sx={{ fontSize: 30, color: '#f3be00b2', mr: 1 }} />
                            <Typography variant="h6">
                                Recent Student Registrations
                            </Typography>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Registration Date</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recentStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        color: student.status === 'Enrolled' ? 'green' : 'orange',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {student.status}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{student.date}</TableCell>
                                            <TableCell>
                                                <Button 
                                                    variant="contained" 
                                                    size="small"
                                                    sx={{ bgcolor: '#f3be00b2', mr: 1 }}
                                                >
                                                    View Details
                                                </Button>
                                                <Button 
                                                    variant="outlined"
                                                    size="small"
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                {/* Schedule Overview */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Schedule sx={{ fontSize: 30, color: '#f3be00b2', mr: 1 }} />
                            <Typography variant="h6">
                                Schedule Overview
                            </Typography>
                        </Box>
                        {/* Add Calendar component here */}
                        <Box sx={{ height: '400px', bgcolor: '#f9f9f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography color="textSecondary">
                                Calendar Component will be integrated here
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AssistantDashboard;