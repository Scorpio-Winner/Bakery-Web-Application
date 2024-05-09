import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { saveAs } from 'file-saver';
import FormData from 'form-data';

import aiBack from "./img/aiback.png";

const AISection = () => {
  const [description, setDescription] = useState('');
  const [searchPromt, setSearchPromt] = useState('');
  const [newPromt, setNewPromt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSearchPromtChange = (event) => {
    setSearchPromt(event.target.value);
  };

  const handleNewPromtChange = (event) => {
    setNewPromt(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const prompt = description;

      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('output_format', 'webp');

      const response = await axios.post(
        `https://api.stability.ai/v2beta/stable-image/generate/core`,
        formData,
        {
          headers: {
            'Authorization': 'Bearer sk-EF3onnjpn6FawZ7Ra3mj22LJLPBVcv76xYg9BSyIVU35j4om',
            'Accept': 'image/*',
          },
          responseType: 'arraybuffer',
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'image/webp' });
        setFile(blob);
        saveAs(blob, 'image.webp');
        setImageUrl(URL.createObjectURL(blob));
      } else {
        throw new Error(`Error ${response.status}: ${response.data.toString()}`);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleEditClick = async () => {
    try {
      const prompt = " I want to see the original image with the changes described in the other promt";

      const formData = new FormData();
      formData.append('image', file);
      formData.append('prompt', prompt);
      formData.append('search_prompt', searchPromt);
      formData.append('output_format', 'webp');

      const response = await axios.post(
        `https://api.stability.ai/v2beta/stable-image/edit/search-and-replace`,
        formData,
        {
          headers: {
            'Authorization': 'Bearer sk-EF3onnjpn6FawZ7Ra3mj22LJLPBVcv76xYg9BSyIVU35j4om',
            'Accept': 'image/*',
          },
          responseType: 'arraybuffer',
        }
      );

      if (response.status === 200) {
        const blob2 = new Blob([response.data], { type: 'image/webp' });
        saveAs(blob2, 'edited_image.webp');
        setImageUrl(URL.createObjectURL(blob2));
      } else {
        throw new Error(`Error ${response.status}: ${response.data.toString()}`);
      }
    } catch (error) {
      console.error('Error editing image:', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${aiBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '130vh',
      }}
    >
      <div
        style={{
          backgroundColor: '#F2F6FA',
          color: '#2E363E',
          fontSize: 'small',
          width: 'fit-content',
          marginTop: '36vh',
          paddingLeft: '1vw',
          paddingRight: '1vw',
          borderRadius: '10px',
        }}
      >
        <h2>Не нашли то, что нужно?</h2>
      </div>

      <div style={{ padding: '20px', textAlign: 'center', color: 'white', width: '35%' }}>
        <p style={{ fontSize: '35px' }}>Приготовим заказ любой сложности по вашему описанию.</p>
        <p style={{ fontSize: '18px' }}>Подтвердите эскиз, и мы рассчитаем стоимость за 30 минут.</p>
      </div>

      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Сгенерированное изображение" style={{ width: '300px', height: '300px', marginBottom:'2vh', borderRadius:'2vh' }} />
        </div>
      )}

      <div style={{ backgroundColor: 'white', padding: '20px', textAlign: 'center', borderRadius: '10px' }}>
      {imageUrl && (
        <TextField
        label="Новое описание"
        value={newPromt}
        onChange={handleNewPromtChange}
        placeholder="Введите желаемый результат"
      />
      )}

      {imageUrl && (
        <TextField
        label="Заменяемые объекты"
        value={searchPromt}
        onChange={handleSearchPromtChange}
        placeholder="Перечислите, какие элементы нужно изменить"
      />
      )}

      {!imageUrl && (
        <TextField
        label="Описание"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Введите описание"
      />
      )}
      </div>

      {imageUrl && (
        <div style={{ margin: '40px', marginBottom:'28vh' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#f5c518', '&:hover': { backgroundColor: '#70C05B' } }}
            onClick={handleEditClick}
          >
            Отредактировать
          </Button>
        </div>
      )}

      {!imageUrl && (
        <div style={{ margin: '40px', marginBottom:'28vh' }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#f5c518', '&:hover': { backgroundColor: '#70C05B' } }}
            onClick={handleButtonClick}
          >
            Получить результат
          </Button>
        </div>
      )}
    </div>
  );
};

export default AISection;