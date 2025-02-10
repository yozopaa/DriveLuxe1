// SignUp.js
import { Box, Button, TextField, Typography, Paper, CircularProgress, Snackbar, IconButton } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const InputField = ({ label, type, value, onChange, error }) => (
  <Box marginBottom={2}>
    <TextField 
      label={label} 
      type={type} 
      variant="outlined" 
      fullWidth 
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
    />
  </Box>
);

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const history = useHistory();

  const validateInputs = () => {
    let errors = {};

    if (!fullName) errors.fullName = 'Le nom complet est requis';
    if (!email) errors.email = 'L\'adresse e-mail est requise';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Format d\'adresse e-mail invalide';
    if (!phone) errors.phone = 'Le numéro de téléphone est requis';
    else if (!/^[0-9+]{8,}$/.test(phone)) errors.phone = 'Le numéro doit contenir au moins 8 chiffres';
    if (!password) errors.password = 'Le mot de passe est requis';
    else if (password.length < 8) {
        errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])/.test(password)) {
        errors.password = 'Le mot de passe doit contenir au moins 1 chiffre et 1 lettre';
    }

    setError(errors);
    return Object.keys(errors).length === 0;
};

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
          role: 'candidate'
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
        history.push('/login');
      } else {
        setError({ form: data.message || 'L\'inscription a échoué. Veuillez réessayer.' });
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError({ form: 'Erreur de connexion. Veuillez réessayer plus tard.' });
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="90vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, width: '100%', textAlign: 'center', position: 'relative' }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Inscription à DriveLuxe
        </Typography>

        <InputField 
          label="Nom Complet" 
          type="text" 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} 
          error={error?.fullName}
        />

        <InputField 
          label="Adresse e-mail" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          error={error?.email}
        />

        <InputField 
          label="Numéro de téléphone" 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          error={error?.phone}
        />

        <Box position="relative">
          <InputField 
            label="Mot de passe" 
            type={showPassword ? 'text' : 'password'} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            error={error?.password}
          />
          <IconButton 
            onClick={() => setShowPassword(!showPassword)} 
            sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
          Le mot de passe doit contenir au moins 8 caractères, 1 chiffre et 1 lettre
        </Typography>

        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            mt: 2, 
            backgroundColor: '#f3be00cc', 
            height: '40px', 
            '&:hover': { backgroundColor: '#bfa442b2' }  
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'S\'inscrire'}
        </Button>

        <Typography variant="body2" mt={2} color="gray">
          Déjà inscrit ?{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: '#f3be00cc', fontWeight: 'bold' }}>
            Se connecter
          </Link>
        </Typography>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={error?.form || 'Inscription réussie !'}
      />
    </Box>
);
};

export default SignUp;