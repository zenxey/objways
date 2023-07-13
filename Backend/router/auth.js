const express = require('express');
const router = express.Router();
const prodData = require('../models/productModal');
const userData = require('../models/userModal');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const cors = require('cors');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

// API endpoint
router.get('/api', (req, res) => {
  res.send('API endpoint');
});

// User registration
router.post('/api/signup', async function (req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if all required fields are filled
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please fill in all the fields properly" });
    }

    // Check if the user already exists
    const userExist = await userData.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    // Create a new user document and save it
    const udata = new userData({ name, email, password });
    await udata.save();

    console.log(`${udata} user registered successfully`);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// User login
router.post('/api/signin', async (req, res) => {
  try {
    let userToken;
    const { email, password } = req.body;

    // Check if all required fields are filled
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all the fields properly" });
    }

    // Find the user in the database
    const userLogin = await userData.findOne({ email: email });

    if (userLogin) {
      if (password === userLogin.password) { // Compare the password directly

        // Check if cookie already exists in the request header
        if (req.cookies.jwtoken) {
          userToken = req.cookies.jwtoken;
        } else {
          // Generate a new JWT token and set it as a cookie
          userToken = await userLogin.generateAuthToken();
          console.log(userToken+ 'is the login generated token on line 63');
          res.cookie("jwtoken", userToken, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
            secure: true,
            sameSite: "none"
          });
        }
        res.json({ message: "User signed in successfully" });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// User logout
router.post('/api/logout', async (req, res) => {
  try {
    // Clear the JWT token cookie
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all product data (requires authentication)
router.get('/api/produ', authenticate, async (req, res) => {
  try {
    // Access the authenticated user object
    const currentUser = req.rootUser;

    // Fetch all product data or perform any other actions based on the authenticated user
    const allProdData = await prodData.find();

    res.status(200).json(allProdData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get products in user's cart (requires authentication)
router.post('/api/prodincart', authenticate, async (req, res) => {
  try {
    const productIds = req.body.productIds;

    console.log('Product IDs:', productIds);

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: 'Invalid product IDs' });
    }

    // Fetch the products with the specified IDs
    const products = await prodData.find({ _id: { $in: productIds } });

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove a product from the cart (requires authentication)
router.delete('/api/removefromcart/:productId', authenticate, async (req, res) => {
  try {
    const productId = req.params.productId;

    // Access the authenticated user object
    const currentUser = req.rootUser;

    // Find the user in the database and remove the product from the cart
    await userData.findOneAndUpdate(
      { _id: currentUser._id },
      { $pull: { cart: { _id: productId } } }
    );

    res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a product to the cart (requires authentication)
router.post('/api/cart', authenticate, async (req, res) => {
  try {
    const currentUser = req.rootUser;
    const { _id } = req.body;

    console.log('currentUser:', currentUser);
    console.log('product:', _id);

    if (!currentUser || !_id) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    // Fetch the product details from the database
    const product = await prodData.findById(_id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Add the product ID to the "cart" array in the user document
    currentUser.cart.push(product._id);

    await currentUser.save();

    res.status(200).json(currentUser.cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

// Get user's cart data (requires authentication)
router.get('/api/getusercart', authenticate, async (req, res) => {
  try {
    const currentUser = req.rootUser;

    if (!currentUser) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    // Fetch the cart data for the user
    const cartData = await userData.findById(currentUser._id).populate('cart.productId', '-__v'); // Exclude the '__v' field from the populated product data

    if (!cartData) {
      return res.status(404).json({ error: 'Cart data not found' });
    }

    res.status(200).json(cartData.cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

module.exports = router;
