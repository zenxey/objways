import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import { Card, CardImg, CardBody, CardTitle, CardText, Button, InputGroup, Input, InputGroupText } from 'reactstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  const [prodData, setProdData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]); // Add filteredData state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/produ', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true // Add this to send cookies with the request
        });

        setProdData(response.data);
        setFilteredData(response.data); // Add this line to initialize filteredData with the fetched data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Unauthorized, jwtoken doesn't exist or is invalid
          navigate('/Signin');
        } else {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleAddToCart = async (product) => {
    try {
      console.log('ProductId:', product._id); // Log _id
      await axios.post(
        'http://localhost:5000/api/cart',
        { _id: product._id }, // Pass the _id as the productId
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(`Product ${product.Handle} added to cart`);
    } catch (error) {
      console.log(error);
    }
    navigate('/Cart');
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim(); // Convert the search query to lowercase and trim whitespace

    // Filter the products based on the search query
    const filteredProducts = prodData.filter((item) => {
      if (!item.Handle || !item['Variant SKU']) {
        return false;
      }

      // Check if the SKU or Handle contains the search query
      return (
        item['Variant SKU'].toLowerCase().includes(query) ||
        item.Handle.toLowerCase().includes(query)
      );
    });

    setFilteredData(filteredProducts);
  };

  return (
    <div>
      <div className="search-bar">
        <InputGroup>
          <Input
            type="text"
            placeholder="Search by SKU or Handle"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button color="primary" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="product-list">
          {filteredData.map((item) => (
            <Card key={item._id} className="mb-4 product-card">
              <CardImg top width="100%" src={item['Image Src']} alt={item.Handle} />
              <CardBody>
                <CardTitle tag="h5">{item.Handle}</CardTitle>
                <CardText>
                  Vendor: {item.Vendor}
                  <br />
                  Tags: {item.Tags}
                </CardText>
                {item['Variant Price'] ? (
                  <div>
                    <span className="price">Variant Price: </span>
                    <span className="price-value text-success">${item['Variant Price']}</span>
                  </div>
                ) : (
                  <div>
                    <span className="not-available">Not Available</span>
                  </div>
                )}
                {item['Variant Price'] && (
                  <div>
                    <Button color="success" onClick={() => handleAddToCart(item)}>
                      Buy +
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

};

export default Home;
