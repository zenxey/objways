const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');
const app = express();
require('dotenv').config();
const path = require("path");
const cookieParser = require('cookie-parser')

const db = process.env.db;

mongoose.Promise = global.Promise;
mongoose.connect(db)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

  // Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend origin
  // origin: '*', // Allow all origins
  credentials: true // Allow cookies and authentication headers to be sent
}));

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.json());
app.use('/api', router); // Use the router for API routes, adjust the path if needed
app.use(require('./router/auth'));
// app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
