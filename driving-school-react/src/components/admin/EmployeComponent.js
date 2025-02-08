//EmployeComponent.js
import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Snackbar
} from '@mui/material';

const EmployeComponent = ({ role }) => {
  const [employees, setEmployees] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newEmployee, setNewEmployee] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    role: role, // 'trainer' or 'assistant'
  });

  // Fetch employees based on role
  useEffect(() => {
    fetchEmployees();
}, [role, employees.length]); // Add employees.length as dependency
  const fetchEmployees = async () => {
    try {
        console.log('Fetching employees for role:', role); // Debug log
        
        const response = await fetch(`http://localhost:5000/api/auth/users-by-role/${role}`);
        const data = await response.json();
        
        console.log('Fetched employees:', data); // Debug log

        if (response.ok) {
            setEmployees(data);
        } else {
            throw new Error('Erreur lors du chargement des données');
        }
    } catch (error) {
        console.error('Error fetching employees:', error);
        setSnackbar({
            open: true,
            message: 'Erreur lors du chargement des employés',
            severity: 'error'
        });
    }
};

  const handleOpenDetails = (employee) => {
    setSelectedEmployee(employee);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedEmployee(null);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewEmployee({
      fullName: '',
      phone: '',
      email: '',
      password: '',
      role: role,
    });
  };

  const handleAddEmployee = async () => {
    try {
        console.log('Sending new employee data:', newEmployee); // Debug log

        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmployee),
        });

        const data = await response.json();
        console.log('Server response:', data); // Debug log

        if (response.ok) {
            setSnackbar({
                open: true,
                message: 'Employé ajouté avec succès',
                severity: 'success'
            });
            handleCloseAdd();
            // Add a delay before fetching updated list
            setTimeout(() => {
                fetchEmployees();
            }, 500);
        } else {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }
    } catch (error) {
        console.error('Error adding employee:', error);
        setSnackbar({
            open: true,
            message: error.message || 'Erreur lors de l\'ajout de l\'employé',
            severity: 'error'
        });
    }
};
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmployees(employees.filter((emp) => emp._id !== id));
        setSnackbar({
          open: true,
          message: 'Employé supprimé avec succès',
          severity: 'success'
        });
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la suppression de l\'employé',
        severity: 'error'
      });
    }
  };

  const getPageTitle = () => {
    return role === 'trainer' ? 'Moniteurs' : 'Assistants';
  };

  return (
    <div>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: '#f3be00b2',
            '&:hover': { backgroundColor: '#bfa442b2' }
          }} 
          onClick={handleOpenAdd}
        >
          Ajouter un {role === 'trainer' ? 'moniteur' : 'assistant'}
        </Button>
      </Grid>

      <Paper sx={{ padding: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f3be00b2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nom</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Téléphone</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee.fullName}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      onClick={() => handleOpenDetails(employee)}
                      sx={{ mr: 1, backgroundColor: '#f3be00b2', '&:hover': { backgroundColor: '#bfa442b2' } }}
                    >
                      Détails
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error" 
                      onClick={() => handleDelete(employee._id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Employee Details Dialog */}
      <Dialog open={openDetails} onClose={handleCloseDetails} fullWidth>
        <DialogTitle>Détails de l'employé</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <div>
              <TextField fullWidth label="Nom" value={selectedEmployee.fullName} margin="dense" disabled />
              <TextField fullWidth label="Téléphone" value={selectedEmployee.phone} margin="dense" disabled />
              <TextField fullWidth label="Email" value={selectedEmployee.email} margin="dense" disabled />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Employee Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd} fullWidth>
        <DialogTitle>Ajouter un {role === 'trainer' ? 'moniteur' : 'assistant'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nom complet"
            value={newEmployee.fullName}
            onChange={(e) => setNewEmployee({ ...newEmployee, fullName: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Téléphone"
            value={newEmployee.phone}
            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Email"
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={newEmployee.password}
            onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="error">
            Annuler
          </Button>
          <Button 
            onClick={handleAddEmployee}
            sx={{ backgroundColor: '#f3be00b2', color: 'white', '&:hover': { backgroundColor: '#bfa442b2' } }}
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EmployeComponent;