const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')


const mongoURI = 'mongodb://localhost:27017/bcdCard'; // Replace with your MongoDB URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// const uri = 'mongodb+srv://bcdcards23:Pyp2dUQp48SC7qPH@bcd-cards.27gcwhb.mongodb.net/?retryWrites=true&w=majority'
// const uri = 'mongodb+srv://hacks7331:SH74Z1tgwY4OaDXu@cluster0.7luc7b1.mongodb.net/?retryWrites=true&w=majority'

// Connect to Database
// mongoose.connect(uri);

// // On Connection
// mongoose.connection.on('connected', () => {
//     console.log("Connected to database " + uri)
// })

// On error
// mongoose.connection.on('error', (err) => {
//     console.log("Database Error: " + err)
// })


const app = express();
const users = require('./routes/users');
const files = require('./routes/files');


const port = 3000;


// CORS Middleware
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middlware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);
app.use('/files', files);

// Index Route
app.get('', (req, res) => {
    res.send("Invalid Endpoint")
})


// Start Server
app.listen(3000, () => {
    console.log("server started on port " + port);
})

