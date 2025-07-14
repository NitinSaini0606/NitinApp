const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    maxlength: 100,
  },
  contact: {
    type: Number,
    required: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    
  },
  confirmPassword: {
    type: String,
    required: true,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const User = mongoose.model("User" , userSchema);
module.exports = User;