const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); //to encrypt the password 


const User = require('../models/user');

//Register
router.post('/register', (req, res, next) => {
    //res.send('REGISTER');

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            else {
                let newUser = new User(
                    {
                        name: req.body.name,
                        email: req.body.email,
                        username: req.body.username,
                        password: hash
                    }
                );

                newUser.save()
                    .then(user => {
                        console.log('Successss',user)
                        res.status(200).json({
                            success: true,
                            msg: "User registered"
                        })

                    })
                    .catch(error => {
                        console.log("errorrrr")
                        res.status(401).json({
                            success: false,
                            msg: "Failed in user registration",
                            error: error
                        })

                    })
            }
        })
    })

})

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) throw err;
//         newUser.password = hash;
//     });
// });

// const user = await 
// User.addUser(newUser)
// await 
// newUser.save()
//     .then(res => {
//         console.log('Successss');
//         res.status(200).json({
//             success: true,
//             msg: "User registered"
//         })

//     })
//     .catch(err => {
//         console.log("errorrrr");
//         res.status(401).json({
//             success: false,
//             msg: "Failed in user registration",
//             error: err
//         })
//         // if (user) res.status(200).json({ user })
//         // else {
//         //     res.json({
//         //         success: true,
//         //         msg: "User registered"
//         //     });
//         // }

//         // User.addUser(newUser, (err, user)=>{
//         //     if(err){
//         //         res.json({
//         //             success: false,
//         //             msg: 'Failed to register user'
//         //         });
//         //     } else {
//         //         res.json({
//         //             success: true,
//         //             msg: "User registered"
//         //         });
//         //     }
//         // });


//Authenticate
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

//Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

module.exports = router;