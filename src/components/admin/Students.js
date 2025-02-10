import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, MenuItem, Select, InputLabel, FormControl, 
  Box, Typography, Paper, Grid, Alert, CircularProgress,
  Snackbar
} from '@mui/material';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    address: '',
    age: '',
    permitType: '',
    totalAmount: '',
    amountPaid: '',
    instructor: '',
    enrollmentDate: '',
    status: 'Actif'
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/students');
        const data = await response.json();
        
        // Debug logs
        console.log('Response status:', response.status);
        console.log('Fetched data:', data);

        if (!response.ok) {
            throw new Error('Erreur lors du chargement des étudiants');
        }
        
        // Make sure data is an array
        if (Array.isArray(data)) {
            setStudents(data);
        } else {
            console.error('Data is not an array:', data);
            setStudents([]);
        }
    } catch (error) {
        setError(error.message);
        console.error('Error fetching students:', error);
    } finally {
        setLoading(false);
    }
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStudent = async () => {
    try {
      const requiredFields = [
        'name', 'email', 'address', 'age', 
        'permitType', 'totalAmount', 'amountPaid', 'enrollmentDate'
      ];

      const missingFields = requiredFields.filter(field => !newStudent[field]);
      if (missingFields.length > 0) {
        setError(`Veuillez remplir tous les champs requis: ${missingFields.join(', ')}`);
        return;
      }

      const formattedStudent = {
        ...newStudent,
        age: parseInt(newStudent.age),
        totalAmount: parseFloat(newStudent.totalAmount),
        amountPaid: parseFloat(newStudent.amountPaid),
        enrollmentDate: new Date(newStudent.enrollmentDate).toISOString()
      };

      const response = await fetch('http://localhost:5000/api/students/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(formattedStudent)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      await fetchStudents();
      handleCloseDialog();
      setSnackbar({
        open: true,
        message: 'Étudiant ajouté avec succès',
        severity: 'success'
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${editingStudent._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...editingStudent,
          age: parseInt(editingStudent.age),
          totalAmount: parseFloat(editingStudent.totalAmount),
          amountPaid: parseFloat(editingStudent.amountPaid)
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'étudiant');
      }

      await fetchStudents();
      handleCloseEdit();
      setSnackbar({
        open: true,
        message: 'Étudiant mis à jour avec succès',
        severity: 'success'
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/students/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de l\'étudiant');
        }

        await fetchStudents();
        setSnackbar({
          open: true,
          message: 'Étudiant supprimé avec succès',
          severity: 'success'
        });
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewStudent({
      name: '',
      email: '',
      address: '',
      age: '',
      permitType: '',
      totalAmount: '',
      amountPaid: '',
      instructor: '',
      enrollmentDate: '',
      status: 'Actif'
    });
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditingStudent(null);
  };

  const handleEdit = (student) => {
    setEditingStudent({
      ...student,
      enrollmentDate: student.enrollmentDate.split('T')[0]
    });
    setOpenEdit(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => setOpen(true)}
          sx={{ 
            backgroundColor: '#f3be00b2',
            '&:hover': { backgroundColor: '#bfa442b2' }
          }}
        >
          Ajouter un Étudiant
        </Button>
      </Grid>

      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom color="secondary">
          Liste des Étudiants
        </Typography>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3be00b2', color: 'white' }}>
              <th style={{ padding: '10px' }}>Nom</th>
              <th style={{ padding: '10px' }}>Email</th>
              <th style={{ padding: '10px' }}>Adresse</th>
              <th style={{ padding: '10px' }}>Âge</th>
              <th style={{ padding: '10px' }}>Type de Permis</th>
              <th style={{ padding: '10px' }}>Montant Total</th>
              <th style={{ padding: '10px' }}>Montant Payé</th>
              <th style={{ padding: '10px' }}>Montant Restant</th>
              <th style={{ padding: '10px' }}>Status</th>
              <th style={{ padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td style={{ padding: '8px', textAlign: 'center' }}>{student.name}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{student.email}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{student.address}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{student.age}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{student.permitType}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{student.totalAmount}€</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{student.amountPaid}€</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{student.remainingAmount}€</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>{student.status}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <Button 
                    onClick={() => handleEdit(student)}
                    variant="contained"
                    size="small"
                    sx={{ 
                      mr: 1,
                      backgroundColor: '#f3be00b2',
                      '&:hover': { backgroundColor: '#bfa442b2' }
                    }}
                  >
                    Modifier
                  </Button>
                  <Button 
                    onClick={() => handleDelete(student._id)}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>

      {/* Add Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Ajouter un Nouvel Étudiant</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nom"
                name="name"
                fullWidth
                value={newStudent.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={newStudent.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Adresse"
                name="address"
                fullWidth
                value={newStudent.address}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Âge"
                name="age"
                type="number"
                fullWidth
                value={newStudent.age}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Type de Permis"
                name="permitType"
                fullWidth
                value={newStudent.permitType}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Montant Total"
                name="totalAmount"
                type="number"
                fullWidth
                value={newStudent.totalAmount}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Montant Payé"
                name="amountPaid"
                type="number"
                fullWidth
                value={newStudent.amountPaid}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date d'Inscription"
                name="enrollmentDate"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newStudent.enrollmentDate}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button 
            onClick={handleAddStudent}
            variant="contained"
            sx={{ 
              backgroundColor: '#f3be00b2',
              '&:hover': { backgroundColor: '#bfa442b2' }
            }}
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="md" fullWidth>
        <DialogTitle>Modifier l'Étudiant</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nom"
                name="name"
                fullWidth
                value={editingStudent?.name || ''}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={editingStudent?.email || ''}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Adresse"
                name="address"
                fullWidth
                value={editingStudent?.address || ''}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Âge"
                name="age"
                type="number"
                fullWidth
                value={editingStudent?.age || ''}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Type de Permis"
                name="permitType"
                fullWidth
                value={editingStudent?.permitType || ''}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Montant Total"
                name="totalAmount"
                type="number"
                fullWidth
                value={editingStudent?.totalAmount || ''}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Montant Payé"
                name="amountPaid"
                type="number"
                fullWidth
                value={editingStudent?.amountPaid || ''}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date d'Inscription"
                name="enrollmentDate"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={editingStudent?.enrollmentDate || ''}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={editingStudent?.status || ''}
                  onChange={handleEditChange}
                  required
                >
                  <MenuItem value="Actif">Actif</MenuItem>
                  <MenuItem value="En attente">En attente</MenuItem>
                  <MenuItem value="Terminé">Terminé</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Annuler</Button>
          <Button 
            onClick={handleUpdateStudent}
            variant="contained"
            sx={{ 
              backgroundColor: '#f3be00b2',
              '&:hover': { backgroundColor: '#bfa442b2' }
            }}
          >
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Students;