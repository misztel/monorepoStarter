const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  access: {
    type: String,
    default: 'user' // user, admin, superadmin
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  avatarUrl: {
    type: String,
    default: 'images/default/defaultavatar.png'
  }
  // add ref to orders schema
  // orders: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Post'
  // }]
});

module.exports = mongoose.model('User', userSchema);
