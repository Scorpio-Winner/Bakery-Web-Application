import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import { Avatar, Button, Typography, Grid, TextField } from '@mui/material';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    // Получение данных о профиле пользователя из базы данных
    axios.get('/api/profile/3')
      .then(response => {
        setUserData(response.data);
        setEditedData(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных о профиле:', error);
      });
  }, []);

  const handleEdit = () => {
    if (editMode) {
      // Отправка измененных данных на сервер
     // axios.put(`/api/profile/update/${userData.id}`, editedData)
      axios.put(`/api/profile/update/3`, editedData)
        .then(response => {
          console.log('Данные профиля успешно обновлены:', response.data);
          setUserData(editedData);
          setEditMode(false);
        })
        .catch(error => {
          console.error('Ошибка при обновлении данных профиля:', error);
        });
    } else {
      setEditMode(true);
    }
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <TextField
            label="Имя"
            fullWidth
            name="name"
            value={editMode ? editedData.name || '' : userData.name || ''}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <TextField
            label="Фамилия"
            fullWidth
            name="surname"
            value={editMode ? editedData.surname || '' : userData.surname || ''}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={editMode ? editedData.email || '' : userData.email || ''}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <TextField
            label="Номер телефона"
            fullWidth
            name="phone"
            value={editMode ? editedData.phone || '' : userData.phone || ''}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <TextField
            label="Дата рождения"
            fullWidth
            name="birth_date"
            value={editMode ? (editedData.birth_date || '').split('T')[0] : (userData.birth_date || '').split('T')[0]}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <TextField
            label="Описание профиля"
            fullWidth
            name="description"
            value={editMode ? editedData.description || '' : userData.description || ''}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#FED84C', marginTop: '16px', float: 'right' }}
            onClick={handleEdit}
          >
            {editMode ? 'Готово' : 'Редактировать'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;