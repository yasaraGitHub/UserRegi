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
                        console.log('Successss', user)
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


//Authenticate(Login)
router.post('/authenticate', (req, res, next) => {
    console.log("Inside the authenticate route");
    // res.send('AUTHENTICATE');

    const username = req.body.username;
    console.log(username);
    const password = req.body.password;
    console.log(password);

    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) throw err;
        if (!user) console.log("No such user exists, incorrect username!");
        if (user) {
            console.log({
                user: user
            });

            User.camparePassword(req.body.password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (user && !isMatch) {
                    console.log("Password is not matching");
                    res.json({
                        msg: "Incorrect password, try again!"
                    });
                }
                if (isMatch) {
                    console.log('Authentication successful', user.password);
                    const token = jwt.sign({ id: user.id }, 'mySecretKey', { expiresIn: '10h' });
                    // console.log(token);
                    res.json({token: token});
                };
            })
        }


    })
});

//Profile
router.post('/profile', User.extractToken, (req, res, next) => {
    // res.send('PROFILE');
    jwt.verify(req.token, 'mySecretKey', (err, authData) => {
        console.log('Extracted token', req.token);
        if(err) {
            console.log('Forbidden', authData, err);
            res.sendStatus(403);
        } //forbidden
        else if(typeof authData !== 'undefined') { 
            console.log('This ur profile', authData);
            res.json({
                message: "This is ur profile...."
            })
        }
    });
});

module.exports = router;