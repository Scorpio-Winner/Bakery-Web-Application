import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url(your-background-image.jpg)',
    backgroundSize: 'cover',
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    marginBottom: '2rem',
    width: '100px',
    height: '100px',
    backgroundImage: 'url(your-logo-image.jpg)',
    backgroundSize: 'cover',
  },
  input: {
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#FED84C',
    color: 'white',
    '&:hover': {
      backgroundColor: '#FED84C',
    },
  },
}));

const AuthDataForm = ({ onNext, userData }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNext = (e) => {
    e.preventDefault();

    // Validate email, password, and confirmPassword
    if (!email || !password || !confirmPassword) {
      // Handle empty fields
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    // Handle successful validation
    onNext();
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleNext}>
        <div className={classes.logo} />
        <TextField
          className={classes.input}
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={Boolean(passwordError)}
          helperText={passwordError}
        />
        <Button
          className={classes.button}
          variant="contained"
          type="submit"
        >
          Next
        </Button>
      </form>
    </div>
  );
};
