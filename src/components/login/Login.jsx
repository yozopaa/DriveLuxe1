import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Use useHistory for navigation
  const handleLogin = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect based on role
            switch (data.user.role) {
                case 'candidate':
                    history.push(`/candidate/profile/${email}`);
                    break;
                case 'trainer':
                    history.push(`/monitor/dashboard/${email}`);
                    break;
                case 'assistant':
                    history.push(`/assistant/dashboard/${email}`);
                    break;
                case 'admin':
                    history.push(`/admin/dashboard/${email}`);
                    break;
                default:
                    history.push('/error');
            }
        } else {
            alert(data.message || 'Email ou mot de passe invalide');
        }
    } catch (error) {
        console.error('Échec de connexion:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
};

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="80vh" 
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500, textAlign: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="50" viewBox="0 0 24 24" style={{ paddingRight: '5px' }}>
          <path d="M23.5 7c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202zm-1.441 3.506c.639 1.186.946 2.252.946 3.666 0 1.37-.397 2.533-1.005 3.981v1.847c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1h-13v1c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1.847c-.608-1.448-1.005-2.611-1.005-3.981 0-1.414.307-2.48.946-3.666.829-1.537 1.851-3.453 2.93-5.252.828-1.382 1.262-1.707 2.278-1.889 1.532-.275 2.918-.365 4.851-.365s3.319.09 4.851.365c1.016.182 1.45.507 2.278 1.889 1.079 1.799 2.101 3.715 2.93 5.252zm-16.059 2.994c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm10 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm2.941-5.527s-.74-1.826-1.631-3.142c-.202-.298-.515-.502-.869-.566-1.511-.272-2.835-.359-4.441-.359s-2.93.087-4.441.359c-.354.063-.667.267-.869.566-.891 1.315-1.631 3.142-1.631 3.142 1.64.313 4.309.497 6.941.497s5.301-.184 6.941-.497zm2.059 4.527c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-18.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2z" fill="#f3be00b2" />
        </svg>
        
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Connexion DriveLuxe
        </Typography>

        <TextField 
          label="Adresse e-mail" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
          label="Mot de passe" 
          type="password" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            mt: 2, 
            backgroundColor: '#f3be00cc', 
            height: '40px', 
            '&:hover': { backgroundColor: '#bfa442b2' }  
          }}
          onClick={handleLogin}
        >
          Se connecter
        </Button>

        <Typography 
          variant="body2" 
          mt={2} 
          color="gray"
        >
          <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#f3be00cc' }}>
            Mot de passe oublié ?
          </Link>
          {' '}|{' '}
          <Link to="/signup" style={{ textDecoration: 'none', color: '#f3be00cc', fontWeight: 'bold' }}>
            Créer un compte
          </Link>
        </Typography>

      </Paper>
    </Box>
  );
};

export default Login;