const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()


const db = mongoose.connection
db.on('error', err => {
  console.log(err)
})

db.on('open', () => {
  console.log('Connected to MongoDB')
})


mongoose.connect(process.env.MONGODB_URI);
const PORT = process.env.PORT || 3001



// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const partnerRouter = require('./routes/partners');
const contractRouter = require('./routes/contracts');


const app = express();


// app.listen(PORT, () => {
//     console.log('App is up and running on port ' + PORT)
//   })


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/client/build/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})


app.use('/', usersRouter);
app.use('/api/users', usersRouter);
app.use('/api/users/:userId/contracts', contractRouter);
app.use('api/users/:userId/contracts/:contractId/partner', partnerRouter);

//i suspect something is wrong above ^

module.exports = app;
