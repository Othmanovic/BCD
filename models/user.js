const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback)
}

module.exports.getUserByUsername = async function (username) {
    try {
        const query = { username: username };
        const user = await User.findOne(query);
        console.log("user", user);
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports.addUser = function (newUser, req, res) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) throw err
        newUser.password = hash;
        newUser.save().then(user => {
            res.json({
                message: 'User Added successfully'
            })
        })
            .catch(error => {
                res.json({
                    message: 'An error occured!'
                })
            })
    });

}
module.exports.hash = async function (password) {
    console.log("password",password);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    return hash
}

// module.exports.addUser = async function (newUser) {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(newUser.password, salt);
//         newUser.password = hash;
//         const savedUser = await newUser.save();
//         return savedUser;
//     } catch (err) {
//         throw err; // You might want to handle or log the error accordingly
//     }
// };

module.exports.comparePassword = async function (candidatePassword, hash) {
    try {
        let ismatch = await bcrypt.compare(candidatePassword, hash);
        return ismatch
    } catch (error) {
        throw error;
    }
}
