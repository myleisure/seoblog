const mongoose = require('mongoose')

const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 37, 
        unique: true,
        index: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 37, 
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    profile: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },

    salt: {
        type: Number
    },
    about: { type: String },
    role: {
        type: String,
        trim: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timestamp: true})


userSchema.virtual('password')
    .set(function(password){
        //Create a temporary a variable called password
        this._password = password
        // generate salt
        this.Salt = this.makeSalt()
        // encrypt password
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {
    authenticate: function(plaintext) {
        return this.encryptPassword(plaintext) == this.hashed_password
    },
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.Salt)
                        .update(password)
                        .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
}

module.exports = mongoose.model('User', userSchema)