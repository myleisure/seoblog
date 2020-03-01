const express = require('express')
const {signUp, signIn} = require('../controllers/auth')

const router = express.Router()

const {runValidation} = require('../validators')
const {userSignupValidator, userSignInValidator} = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, signUp)

router.post('/signin', userSignInValidator, runValidation, signIn)

module.exports = router