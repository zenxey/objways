const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  tokens: [
    {
      userToken: {
        type: String,
        required: true
      }
    }
  ],
  cart: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'prodData' // Use the model name 'prodData' (productModal.js model)
      }
    }
  ]
});

// generate authtoken
userSchema.methods.generateAuthToken = async function() {
  try {
    let userToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ userToken: userToken });
    await this.save();
    return userToken;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model('userData', userSchema, 'usersData');
