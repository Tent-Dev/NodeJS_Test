const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
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
  liked:[{
    _id: false,
    task_id: ObjectId
  }]
});

const UserModel = mongoose.model('userlists', userSchema ,'userlists');

module.exports = UserModel;