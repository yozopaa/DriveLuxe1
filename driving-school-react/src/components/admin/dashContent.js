// DashContent.js
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';
import { School, People, AttachMoney, EventNote } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
const DashContent = ({ onMenuChange }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashData, setDashData] = useState({
    counts: {
        students: 0,
        staff: 0,
        totalAmount: 0
    },
    upcomingLessons: [],
    studentStatuses: [],
    monthlyPayments: [],
    monthlyEnrollments: []
});

// Improve error handling and loading states
const fetchDashboardData = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/dashboard/stats', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des données');
        }
        
        const data = await response.json();
        setDashData(data);
    } catch (error) {
        setError('Erreur de chargement du tableau de bord: ' + error.message);
        console.error('Dashboard fetch error:', error);
    } finally {
        setLoading(false);
    }
};
  const history = useHistory();
const refreshInterval = useRef(null);

useEffect(() => {
    fetchDashboardData(); // Initial fetch
    
    // Refresh every 5 minutes
    refreshInterval.current = setInterval(() => {
        fetchDashboardData();
    }, 300000);

    return () => {
        if (refreshInterval.current) {
            clearInterval(refreshInterval.current);
        }
    };
}, []);
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleNavigate = (path, menu) => {
    if (onMenuChange) {
      onMenuChange(menu);
    }
    history.push(path);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress sx={{ color: '#f3be00b2' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
// Add this to dashContent.js

  return (
    <Grid container spacing={3}>
      {/* Total Étudiants */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ minHeight: 250, backgroundColor: '#FFF3E0' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Étudiants
            </Typography>
            <Typography variant="h4" sx={{ color: '#f3be00b2' }}>
              {dashData.counts.students}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <School sx={{ marginRight: 1, color: '#f3be00b2' }} />
              <Typography variant="body2">Étudiants</Typography>
            </Box>
           
          </CardContent>
        </Card>
      </Grid>

      {/* Personnel */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ minHeight: 250, backgroundColor: '#FFF3E0' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personnel
            </Typography>
            <Typography variant="h4" sx={{ color: '#f3be00b2' }}>
              {dashData.counts.staff}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <People sx={{ marginRight: 1, color: '#f3be00b2' }} />
              <Typography variant="body2">Moniteurs & Assistants</Typography>
            </Box>
       
          </CardContent>
        </Card>
      </Grid>

      {/* Montant Total */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ minHeight: 250, backgroundColor: '#FFF3E0' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Montant Total
            </Typography>
            <Typography variant="h4" sx={{ color: '#f3be00b2' }}>
              {dashData.counts.totalAmount.toLocaleString('fr-FR')}DH
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <AttachMoney sx={{ marginRight: 1, color: '#f3be00b2' }} />
              <Typography variant="body2">Montant Collecté</Typography>
            </Box>
          
          </CardContent>
        </Card>
      </Grid>

      {/* Cours à Venir */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ minHeight: 250, backgroundColor: '#FFF3E0' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cours à Venir
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <EventNote sx={{ marginRight: 1, color: '#f3be00b2' }} />
              <Typography variant="body2">Prochains Cours</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
              {dashData.upcomingLessons.map((lesson) => (
                <Typography key={lesson._id} variant="body2" sx={{ mb: 1 }}>
                  {formatDate(lesson.start)} - {lesson.student.name}
                </Typography>
              ))}
            </Box>
          
          </CardContent>
        </Card>
      </Grid>

   


      {/* Graphiques statistiques */}
      <Grid item xs={12} sm={6} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Répartition des Statuts
            </Typography>
            <ReactApexChart
              options={{
                chart: { type: 'pie' },
                labels: dashData.studentStatuses.map(status => status._id),
                colors: ['#f3be00b2', '#bfa442b2', '#FFE082'],
                responsive: [{
                  breakpoint: 480,
                  options: {
                    chart: { width: 200 },
                    legend: { position: 'bottom' }
                  }
                }]
              }}
              series={dashData.studentStatuses.map(status => status.count)}
              type="pie"
              height={350}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Évolution des paiements */}
      <Grid item xs={12} sm={6} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Évolution des Paiements
            </Typography>
            <ReactApexChart
              options={{
                chart: { type: 'bar' },
                xaxis: {
                  categories: dashData.monthlyPayments.map(
                    payment => monthNames[payment._id.month - 1]
                  )
                },
                colors: ['#f3be00b2']
              }}
              series={[{
                name: 'Montant Collecté',
                data: dashData.monthlyPayments.map(payment => payment.total)
              }]}
              type="bar"
              height={350}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Évolution des inscriptions */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Évolution des Inscriptions
            </Typography>
            <ReactApexChart
              options={{
                chart: {
                  type: 'line',
                  zoom: { enabled: false }
                },
                xaxis: {
                  categories: dashData.monthlyEnrollments.map(
                    enrollment => monthNames[enrollment._id.month - 1]
                  )
                },
                colors: ['#f3be00b2'],
                stroke: { curve: 'smooth' }
              }}
              series={[{
                name: 'Nouveaux Étudiants',
                data: dashData.monthlyEnrollments.map(enrollment => enrollment.count)
              }]}
              type="line"
              height={350}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashContent;