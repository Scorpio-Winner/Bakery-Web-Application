import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import logo from '../header/logo.png';
import Header from '../header/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#F8F8F8',
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    width:'40%',
    margin: '0 auto',
  },
  logo: {
    width: '150px',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: '28px',
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    fontSize: '24px',
    marginBottom: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

const currentDate = new Date().toLocaleDateString();

const Backet = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />

      {/* Form */}
      <Paper className={classes.formContainer}>
        <Typography variant="h3" className={classes.title}>
          Оформить заказ
        </Typography>

        <img src={logo} alt="Logo" className={classes.logo} />

        <Typography variant="h4" className={classes.subtitle}>
          Детали заказа
        </Typography>

        <Typography variant="subtitle1">Корзина:</Typography>

        <TextField
          className={classes.input}
          label="Какие-то пожелания?"
          variant="outlined"
        />

        <Typography variant="subtitle1">
          Заказ размещен: {currentDate}
        </Typography>

        <TextField
          className={classes.input}
          label="Адрес доставки"
          variant="outlined"
        />

        <Typography variant="subtitle1">Стоимость:</Typography>

        <Button variant="contained" color="primary" className={classes.button}>
          Оформить
        </Button>
      </Paper>
    </div>
  );
};

export default Backet;
