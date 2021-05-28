const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 5,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 5,
    },
    mobileno: {
        type: Number,
        required: true,
        minLength: 10,
        maxLength: 10,
        default: null
    }
    , password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    }
}, { timestamps: { updatedAt: false } })


const User = mongoose.model('User', userSchema)

module.exports = User