import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '70%',
    gap: '1vh'
  },
  card: {
    width: '300px',
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: '#f5c518',
    color: '#fff',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#70C05B',
    },
  },
  quantityContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  quantityButton: {
    minWidth: '30px',
    borderRadius: '50%',
    padding: 0,
  },
}));

const ProductPage = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [avatars, setAvatars] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    // Получаем продукты
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
        // После получения продуктов, запрашиваем фотографии для каждого продукта
        response.data.forEach(product => {
          axios.get(`/api/products/avatar/${product.id}`, { responseType: 'blob' })
            .then(res => {
              const avatarUrl = URL.createObjectURL(res.data);
              setAvatars(prevState => ({ ...prevState, [product.id]: avatarUrl }));
            })
            .catch(error => {
              console.error(`Error fetching avatar for product ID ${product.id}:`, error);
              // Можно установить заглушку в случае ошибки получения фотографии
              setAvatars(prevState => ({ ...prevState, [product.id]: 'здесь__заглушка_для_фото' }));
            });
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleOrderClick = (productId) => {
    const quantity = selectedQuantities[productId] || 0;
    setSelectedQuantities(selectedQuantities);

    if (quantity + 1 > 0) {
      // Perform the desired action (e.g., send the order)
      console.log('Sending order for product ID:', productId);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const quantity = selectedQuantities[productId] || 0;
    if (quantity > 0) {
      const updatedQuantities = { ...selectedQuantities, [productId]: quantity - 1 };
      setSelectedQuantities(updatedQuantities);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const quantity = selectedQuantities[productId] || 0;
    const updatedQuantities = { ...selectedQuantities, [productId]: quantity + 1 };
    setSelectedQuantities(updatedQuantities);
  };

  const fetchAvatars = (products) => {
    const avatarRequests = products.map((product) =>
      axios.get(`/api/products/avatar/${product.id}`, { responseType: 'blob' })
    );

    axios
      .all(avatarRequests)
      .then(
        axios.spread((...responses) => {
          const updatedAvatars = {};
          responses.forEach((response, index) => {
            const productId = products[index].id;
            const avatarUrl = URL.createObjectURL(response.data);
            updatedAvatars[productId] = avatarUrl;
          });
          setAvatars(updatedAvatars);
        })
      )
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" style={{ marginBottom: '5vh' }}>
        Для любых событий и дорогих вам людей
      </Typography>
      <div className={classes.container}>
        {products.map((product) => (
          <Card key={product.id} className={classes.card}>
              <img src={avatars[product.id]} alt={product.name} />
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>
              <div className={classes.quantityContainer}>
                <Typography variant="h6">{product.price} р/шт</Typography>
                <div>
                  <Button
                    className={classes.quantityButton}
                    onClick={() => handleDecreaseQuantity(product.id)}
                  >
                    <RemoveIcon />
                  </Button>
                  <Typography variant="h6">{selectedQuantities[product.id] || 0}</Typography>
                  <Button
                    className={classes.quantityButton}
                    onClick={() => handleIncreaseQuantity(product.id)}
                  >
                    <AddIcon />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardActions>
              <Button
                className={classes.button}
                onClick={() => handleOrderClick(product.id)}
                fullWidth
              >
                Заказать
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;