import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import backgroundImage from './img/reviewsback.png'; // Путь к фоновому изображению

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    // Запрос на сервер для получения всех отзывов с данными о пользователе и заказе
    axios
      .get('/reviews?_expand=Order&_expand=Order.User')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleNextReview = () => {
    setCurrentReviewIndex(prevIndex => (prevIndex + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex(prevIndex => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const getStarRating = rating => {
    // Конвертирование рейтинга в звезды (можно использовать иконки звезд)
    switch (rating) {
      case 1:
        return '⭐';
      case 2:
        return '⭐⭐';
      case 3:
        return '⭐⭐⭐';
      case 4:
        return '⭐⭐⭐⭐';
      case 5:
        return '⭐⭐⭐⭐⭐';
      default:
        return '';
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
      padding="16px"
      borderRadius="4px"
      boxShadow={1}
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      <Typography variant="h5" align="center" gutterBottom color={'white'}>
        Почитайте отзывы довольных клиентов
      </Typography>
      {reviews.length > 0 ? (
        <Box display="flex" alignItems="center" flexDirection="column" marginBottom="16px">
          <Typography variant="h4" align="center">
            {getStarRating(reviews[currentReviewIndex].rating)}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            {reviews[currentReviewIndex].short_review}
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary">
            {reviews[currentReviewIndex].description}
          </Typography>
        </Box>
      ) : (
        <Typography variant="body1" align="center" color={'white'}>
          Нет доступных отзывов.
        </Typography>
      )}
      <Box display="flex" alignItems="center">
        {reviews.length > 0 && (
          <Avatar
            alt="Аватар"
            src={reviews[currentReviewIndex].Order.User.avatar}
            sx={{ width: 64, height: 64, marginRight: '16px' }}
          >
            {!reviews[currentReviewIndex].Order.User.avatar && '👤'}
          </Avatar>
        )}
        {reviews.length > 0 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {reviews[currentReviewIndex].Order.User.name} {reviews[currentReviewIndex].Order.User.surname}
            </Typography>
          </Box>
        )}
      </Box>
      {reviews.length > 1 && (
        <Box display="flex" alignItems="center" justifyContent="center" marginTop="16px">
          <IconButton color="primary" onClick={handlePrevReview}>
            <ArrowBack />
          </IconButton>
          <IconButton color="primary" onClick={handleNextReview}>
            <ArrowForward />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ReviewSlider;