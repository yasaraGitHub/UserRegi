const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');
const users = require('./routes/users')

const app = express();

// mongoose.connect('Connected', ()=>{
// console.log("Connected " + config.database);
// })

mongoose.connect('mongodb://localhost:27017/meanauth', { useUnifiedTopology: true, useNewUrlParser: true })
          .then(()=>{console.log("Connected to "+ config.database)})
          .catch(err=>{console.log(err)});

//port number
const port = 3000;

//cors middlewear
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middlewear
app.use(bodyParser.json());

//index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

//other routes
app.use('/users', users);

//start server
app.listen(port, ()=>{
    console.log('Server started on port ' + port);
});


