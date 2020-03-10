const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://chutipas:TaTent591220306@cluster0-94rnq.mongodb.net/Nodejs_test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});