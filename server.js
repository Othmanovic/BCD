const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')
const uri = 'mongodb+srv://bcdcards23:Pyp2dUQp48SC7qPH@bcd-cards.27gcwhb.mongodb.net/?retryWrites=true&w=majority'
// Connect to Database
mongoose.connect(uri);

// On Connection
mongoose.connection.on('connected', () => {
    console.log("Connected to database " + uri)
})

// On error
mongoose.connection.on('error', (err) => {
    console.log("Database Error: " + err)
})


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

// PORT = 3000
// MONGO_URI = mongodb+srv://othmanovic123:othmanovic123@cluster1.oebwh.mongodb.net/UTM-OPS?retryWrites=true&w=majority
// GOOGLE_CLIENT_ID = 1090235163552-pl14elji2kv2ohqopm3952dea5ghrh5e.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET = 4TPH7Dd35Tf0XnJfoDYPGOdk
// EMAIL = utmonlineprintingsystem@gmail.com
// PASSWORD = hggih;fv1000lvi
// STRIPE_PUBLIC_KEY= pk_test_51Ir5xXApQJxpQC4tHL83VFwtXjdfbFtR97NsvvxglffFpr6Aphqd3slofMGlGwaMl3LzM123kQYQMro2MmlcO8Pw00qzDNfF8o
// STRIPE_SECRET_KEY = sk_test_51Ir5xXApQJxpQC4tJfQOKESAOqmvGSRbUFHgfFcmexKz3YaMq29OL8g6cibaLB3HfFYe67f6ohKUydahLYrjN2Bz002OuWvGjq
