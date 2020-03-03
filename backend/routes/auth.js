const express = require('express')
const {signUp, signIn, signout, requireSignin} = require('../controllers/auth')

const router = express.Router()

const {runValidation} = require('../validators')
const {userSignupValidator, userSignInValidator} = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, signUp)

router.post('/signin', userSignInValidator, runValidation, signIn)

router.get('/signout', signout)

// just a test
router.get('/secret', requireSignin, (req, res) => {
    res.json({
        message: 'you have access to secret page'
    })
})

module.exports = router