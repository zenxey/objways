import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'; // Import the CSS file
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getusercart', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
  
        // Extract the product IDs from the cart items
        const productIds = response.data.map((item) => item._id);
        // Fetch the product details for the cart items
        const products = await fetchProductDetails(productIds);
        setCartItems(products);
      } catch (error) {
        navigate('/Signin');
        console.log(error);
      }
    };
  
    fetchCartItems();
  }, []);

  // Fetch the details of specific products
  const fetchProductDetails = async (productIds) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/prodincart',
        { productIds },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/removefromcart/${productId}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      
      // Update the cart items after successful removal
      const updatedItems = cartItems.filter((item) => item._id !== productId);
      setCartItems(updatedItems);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="product-list">
        {cartItems.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          cartItems.map((item) => (
            <Card key={item._id} className="mb-4 product-card">
              <CardImg top width="100%" src={item['Image Src']} alt={item.Handle} />
              <CardBody>
                <CardTitle tag="h5">{item.Handle}</CardTitle>
                <CardText>
                  Vendor: {item.Vendor}
                  <br />
                  Type: {item.Type}
                  <div>
                    <span className="price">Variant Price: </span>
                    <span className="price-value text-success">${item['Variant Price']}</span>
                  </div>  
                </CardText>
                <div className="button-container">
                  <Button color="danger" onClick={() => handleRemoveFromCart(item._id)}>
                    Remove
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
