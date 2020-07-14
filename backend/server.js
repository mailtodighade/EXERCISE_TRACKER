const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); //enables to have environment variable in dotenv

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

//middleware....
app.use(cors());
app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//Mongoose connection check...
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database Connection Established Successfully..');
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//starts the server....
app.listen(port, () => {
  console.log(`Server is listning to PORT: ${port}`);
});
