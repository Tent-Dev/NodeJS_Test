const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    //required: true
  },
  password: {
    type: String,
    //required: true
  },
  task:[{
    desc: String
  }]
});

const UserModel = mongoose.model('userlists', userSchema ,'userlists');

module.exports = UserModel;