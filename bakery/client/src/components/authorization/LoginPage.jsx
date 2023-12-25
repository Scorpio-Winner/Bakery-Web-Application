import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Checkbox, FormControlLabel, Link } from '@material-ui/core';
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

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
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#FED84C',
    },
  },
  registerLink: {
    marginTop: '1rem',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate email and password
    if (!email || !password) {
      // Handle empty fields
      return;
    }

    const userData = {
      email,
      password,
      rememberMe,
    };

    loginUser(userData)
      .then((response) => {
        if (!response) {
          errorHandler("Сервис временно недоступен");
          return;
        }

        if (response.status >= 300) {
          errorHandler("Ошибка при авторизации. Код: " + response.status);
          return;
        }

        // Handle successful login
        if (rememberMe) {
          // Save token to local storage for persistent session
          localStorage.setItem('token', response.data.token);
          localStorage.setItem("role", response.data.role);
        } else {
          // Save token to session storage for one session
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem("role", response.data.role);
        }

        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("Error while logging in:", error);
        // Handle error
      });
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleLogin}>
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
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color="primary"
            />
          }
          label="Remember Me"
        />
        <Button
          className={classes.button}
          variant="contained"
          type="submit"
        >
          Войти
        </Button>
        <Link className={classes.registerLink} to={"/register"}>
          Регистрация
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;