// ForgotPassword.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, CircularProgress, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await emailjs.send(
        'service_vgqch7m',
        'template_iz91aqs',
        {
          to_email: email,
          from_name: 'DriveLuxe Auto-école',
          message: 'Une demande de réinitialisation de mot de passe a été effectuée pour votre compte.',
        },
        'NImykX8tsswoC_mY1'
      );

      setSuccess(true);
      setEmail('');
    } catch (error) {
      setError('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
    } finally {
      setLoading(false);
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
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Mot de passe oublié
        </Typography>

        <Typography variant="body1" mb={3} color="text.secondary">
          Entrez votre adresse e-mail et nous vous enverrons les instructions pour réinitialiser votre mot de passe.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField 
            label="Adresse e-mail" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            type="email"
            required
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <Button 
            variant="contained" 
            fullWidth 
            type="submit"
            disabled={loading}
            sx={{ 
              mt: 2, 
              backgroundColor: '#f3be00cc', 
              height: '40px', 
              '&:hover': { backgroundColor: '#bfa442b2' }  
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Envoyer les instructions'
            )}
          </Button>
        </form>

        <Typography variant="body2" mt={2} color="gray">
          <Link to="/login" style={{ textDecoration: 'none', color: '#f3be00cc', fontWeight: 'bold' }}>
            Retour à la connexion
          </Link>
        </Typography>

        <Snackbar 
          open={success} 
          autoHideDuration={6000} 
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Les instructions ont été envoyées à votre adresse e-mail.
          </Alert>
        </Snackbar>

        <Snackbar 
          open={Boolean(error)} 
          autoHideDuration={6000} 
          onClose={() => setError(null)}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;