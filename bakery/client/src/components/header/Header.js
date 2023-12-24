import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Avatar } from '@mui/material';
import { ExitToApp, ShoppingCart, Person, EmojiEmotions } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#F8F8F8' }}>
      <Toolbar>
        {/* Лого */}
        <img src="./logo.png" alt="Лого" />

        {/* Кнопки */}
        <div style={{ marginLeft: 'auto' }}>
          {/* Заказы */}
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>

          {/* Корзина */}
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>

          {/* Профиль */}
          <IconButton color="inherit">
            <Person />
          </IconButton>

          {/* Кнопка выхода */}
          <IconButton color="inherit">
            <ExitToApp />
          </IconButton>
        </div>

        {/* Дополнительные элементы в шапке */}
        <div>
          {/* ... */}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;