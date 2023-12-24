import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Avatar, Button, Typography } from '@mui/material';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Получение данных о профиле пользователя из базы данных
    axios.get('/api/profile')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных о профиле:', error);
      });
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Avatar alt="User Avatar" src={userData.avatar} />
      <Button variant="contained" color="primary">Редактировать</Button>
      <Typography variant="body1">Номер телефона: {userData.phoneNumber}</Typography>
      <Typography variant="body1">Дата рождения: {userData.birthDate}</Typography>
      <Typography variant="body1">Описание профиля: {userData.profileDescription}</Typography>
    </div>
  );
};

export default Profile;