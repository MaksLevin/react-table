import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { loginRequest, registerRequest } from '@core/store/auth/auth.actionCreators';
import { selectAuth } from '@core/store/auth/auth.selectors';

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { loading, error, user } = useSelector(selectAuth);

  const handleSubmit = () => {
    if (isRegistering) {
      dispatch(registerRequest(email, password));
    } else {
      dispatch(loginRequest(email, password));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Grid
    container
    justifyContent="center"
    alignItems="center"
    style={{ minHeight: '100vh', backgroundColor: '#f7f9fc' }}
    >
        <Grid item xs={12} sm={8} md={6}>
            <Paper
            elevation={4}
            sx={{
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
            }}
            >
            <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                {isRegistering ? 'Create an Account' : 'Sign In'}
            </Typography>

            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
            />
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                marginTop: 2,
                backgroundColor: '#007bff',
                '&:hover': { backgroundColor: '#0056b3' },
                }}
            >
                {loading ? (
                <CircularProgress size={24} color="inherit" />
                ) : isRegistering ? (
                'Register'
                ) : (
                'Login'
                )}
            </Button>

            <Button
                variant="text"
                fullWidth
                onClick={() => setIsRegistering(!isRegistering)}
                sx={{ marginTop: 2, color: '#007bff' }}
            >
                {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
            </Button>

            {error && (
                <Typography color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
                {error}
                </Typography>
            )}
            </Paper>
        </Grid>
    </Grid>
  );
};
