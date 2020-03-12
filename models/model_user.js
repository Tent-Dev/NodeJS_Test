const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true}
});

const UserModel = mongoose.model('userlist', userSchema);

module.exports = UserModel;