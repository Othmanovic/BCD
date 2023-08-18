const express = require("express");
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');


// Register
// router.post('/register', (req, res, next) => {
//     let newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//     });

//     // async function someFunction() {
//     //     try {
//     //       const savedUser = await addUser(newUser);
//     //       res.json({success: true, msg: 'User registered'})
//     //     } catch (err) {
//     //         res.json({success: false, msg: 'Failed to register a user'})
//     //     }
//     //   }

//     User.addUser(newUser)
// });


router.post('/register', async (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    try {
        const hash = await User.hash(req.body.password)
        newUser.password = hash;
        newUser.save();
        res.json({ success: true, msg: 'User registered' });
    } catch (error) {
        res.json({ success: false, msg: 'Failed to register user' });

    }

    // res.send('User registered');
});


// Authenticate
router.post('/authenticate', async (req, res, next) => {
    console.log("Autheticate route");
    const username = req.body.username;
    const password = req.body.password;

    let user = await User.getUserByUsername(username);

    if (!user) {
        return res.json({ success: false, msg: 'User not found' });
    }

    let isMatch = User.comparePassword(password, user.password)
    console.log("isMathc: ",isMatch);
    if (isMatch) {
        const token = jwt.sign({ data: user }, config.secret, {
            expiresIn: 604800 // 1 week
        });

        res.json({
            success: true,
            token: `Bearer ${token}`,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });
    } else {
        return res.json({ success: false, msg: 'Wrong password' });
    }
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send("PROFILE")
});

router.get('/users', (req, res, next) => {
    res.send("USERS")
});

// Validate
router.post('/validate', (req, res, next) => {
    res.send("VALIDATE")
});

module.exports = router;
