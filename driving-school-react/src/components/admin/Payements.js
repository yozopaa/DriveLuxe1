import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, LinearProgress, Box, Button, Dialog, DialogActions, DialogContent, 
  DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel,
  Alert, Snackbar, CircularProgress
} from '@mui/material';

const TableauPaiement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [students, setStudents] = useState([]);
  const [newPayment, setNewPayment] = useState({
    studentId: '',
    amount: '',
    type: 'Mensualité',
    method: 'Espèces',
    notes: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchPayments();
    fetchStudents();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/payments');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des paiements');
      }
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des étudiants');
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddPayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayment)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du paiement');
      }

      await fetchPayments();
      handleCloseDialog();
      setSnackbar({
        open: true,
        message: 'Paiement ajouté avec succès',
        severity: 'success'
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/payments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la suppression du paiement');
            }

            await fetchPayments(); // Refresh the list
            setSnackbar({
                open: true,
                message: 'Paiement supprimé avec succès',
                severity: 'success'
            });
        } catch (error) {
            console.error('Delete error:', error);
            setSnackbar({
                open: true,
                message: error.message,
                severity: 'error'
            });
        }
    }
};
  const handleOpenDialog = (student = null) => {
    setCurrentPayment(student);
    if (student) {
      setNewPayment({
        studentId: student._id,
        amount: '',
        type: 'Mensualité',
        method: 'Espèces',
        notes: ''
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setCurrentPayment(null);
    setNewPayment({
      studentId: '',
      amount: '',
      type: 'Mensualité',
      method: 'Espèces',
      notes: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3} bgcolor="white">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">
          Tableau de Bord des Paiements
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => handleOpenDialog()}
          sx={{ 
            backgroundColor: '#f3be00b2',
            '&:hover': { backgroundColor: '#bfa442b2' }
          }}
        >
          Nouveau Paiement
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f3be00b2' }}>
              <TableCell sx={{ color: 'white' }}>Étudiant</TableCell>
              <TableCell sx={{ color: 'white' }}>Montant</TableCell>
              <TableCell sx={{ color: 'white' }}>Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Méthode</TableCell>
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Notes</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell>{payment.student?.name || 'N/A'}</TableCell>
                <TableCell>{payment.amount} DH</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{payment.notes}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained"
                    size="small"
                    sx={{ 
                      mr: 1,
                      backgroundColor: '#f3be00b2',
                      '&:hover': { backgroundColor: '#bfa442b2' }
                    }}
                    onClick={() => handleOpenDialog(payment)}
                  >
                    Modifier
                  </Button>
                  <Button 
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(payment._id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payment Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentPayment ? 'Modifier le Paiement' : 'Nouveau Paiement'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Étudiant</InputLabel>
              <Select
                name="studentId"
                value={newPayment.studentId}
                onChange={handleInputChange}
                required
              >
                {students.map((student) => (
                  <MenuItem key={student._id} value={student._id}>
                    {student.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Montant"
              name="amount"
              type="number"
              value={newPayment.amount}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              required
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Type de Paiement</InputLabel>
              <Select
                name="type"
                value={newPayment.type}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Inscription">Inscription</MenuItem>
                <MenuItem value="Mensualité">Mensualité</MenuItem>
                <MenuItem value="Examen">Examen</MenuItem>
                <MenuItem value="Autre">Autre</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Méthode de Paiement</InputLabel>
              <Select
                name="method"
                value={newPayment.method}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Espèces">Espèces</MenuItem>
                <MenuItem value="Carte">Carte</MenuItem>
                <MenuItem value="Virement">Virement</MenuItem>
                <MenuItem value="Chèque">Chèque</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Notes"
              name="notes"
              multiline
              rows={3}
              value={newPayment.notes}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button 
            onClick={handleAddPayment}
            variant="contained"
            sx={{ 
              backgroundColor: '#f3be00b2',
              '&:hover': { backgroundColor: '#bfa442b2' }
            }}
          >
            {currentPayment ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>

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

export default TableauPaiement;
