const User =  require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const TOKEN_COOKIE_NAME = 'token';

exports.signUp = (req, res) => {
    User.findOne({email: req.body.email}).exec((err, user) => {
        if (user) {
            res.status(400).json({
                error: 'Email is already taken'
            })
        }

        const {name, email, password} = req.body
        let username = shortId.generate()
        let profile = `${process.env.CLIENT_URL}/profile/${username}`

        let newUser = new User({name, email, password, profile, username})

        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                message: "Sign up success"
            }) 
        })
    })
}

exports.signIn = (req, res) => {
    // check if user exists

    const {email, password} = req.body
    User.findOne({email}).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist, please sign up'
            })
        }

        // authenticate
        if (user && !user.authenticate(password)) {
            console.log('did not autnenticate');
            return res.status(400).json({
                error: 'Email and password do not match'
            })
        }


         // generate token and send it to the client
         const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'})

        //  adding token to cookie with a expiration delai
         res.cookie(TOKEN_COOKIE_NAME, token, { expiresIn: '1d' })
         const {_id, username, name, email, role} = user

         return res.json({
             token,
             user
         })

    })
}

exports.signout = (req, res) => {
    res.clearCookie(TOKEN_COOKIE_NAME)
    res.json({
        message: 'Sign out success'
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET
})