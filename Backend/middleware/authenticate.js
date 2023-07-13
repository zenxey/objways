const jwt = require('jsonwebtoken');
const userData = require("../models/userModal");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    if (!token) {
      return res.status(401).send('Unauthorized: No token provided');
    }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = verifyToken._id;

    const rootUser = await userData.findOne({ _id: userId, 'tokens.userToken': token });
    if (!rootUser) {
      return res.status(401).send('Unauthorized: Invalid token');
    }

    req.token = token;
    // console.log(`token in authenticate: ${token}`);
    req.rootUser = rootUser;
    // console.log(`rootUser in authenticate: ${rootUser}`);
    req.userID = userId;
    // console.log(`userId in authenticate: ${userId}`);

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send('Unauthorized: Invalid token');
  }
};

module.exports = authenticate;
