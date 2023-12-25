import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url(back.png)',
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
    backgroundImage: 'url(logo.png)',
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

const PersonalInfoForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate firstName, lastName, phone, and birthdate
    if (!firstName || !lastName || !phone || !birthdate) {
      // Handle empty fields
      return;
    }

    const errorHandler = (errorMessage) => {
      // Handle the error, e.g., show an error message to the user
      console.error(errorMessage);
    };

    const userData = {
      firstName,
      lastName,
      phone,
      birthdate,
    };

    registerUser(userData)
      .then((response) => {
        if (!response) {
          errorHandler("Сервис временно недоступен");
          return;
        }

        if (response.status >= 300) {
          errorHandler("Ошибка при создании пользователя. Код: " + response.status);
          return;
        }

        navigate("/login");
      })
      .catch((error) => {
        console.log("Error while registering user:", error);
        // Handle error
      });
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleRegister}>
        <div className={classes.logo} />
        <TextField
          className={classes.input}
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Birthdate"
          type="date"
          variant="outlined"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          className={classes.button}
          variant="contained"
          type="submit"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;