const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //to encrypt the password 
const config = require('../config/database');

//User schema
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

// module.exports.addUser = function (newUser, callback) {
//     bcrypt.genSalt(10, (err, salt)=>{
//         bcrypt.hash(newUser.password, salt, (err,hash)=>{
//             if(err) throw err;
//             newUser.password = hash;
//             newUser.save(callback);
//             // callback(newUser.save());
//         });
//     });
// }

// module.exports.addUser = async (newUser) => {
//     try {
//         //hashing the password
//         const hash = bcrypt.hashSync(newUser.password, 10);
//         newUser.password = hash;
//         const user = await newUser.save();
//         // resolve(user);
//         return user;

//     } catch (e) {
//         // reject(e)
//         return e;
//     }
// }