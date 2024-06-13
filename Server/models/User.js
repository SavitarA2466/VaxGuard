const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,

  lastName: String,

  email: 
  { type: String, 
    unique: true, 
    required: true 
  },

  phoneNumber: String,

  password: { 
    type: String, 
    required: true, 
    minlength: 8 },

  role: { type: String, 
    enum: ['user', 'admin', 'doctor'],
     default: 'user' 
    } 
});



module.exports = mongoose.model('User', userSchema);
