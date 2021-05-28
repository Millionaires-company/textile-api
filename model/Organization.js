const mongoose = require('mongoose')

const organizationSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 5,
    },
    address: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 5,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    gstNo: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 15,
    },
    panNo: {
        type: String,
        required: true,
        uppercase: true,
        minLength: 10,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
    },
    mobileno: {
        type: Number,
        required: true,
        minLength: 10,
        maxLength: 10,
        default: null
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
    }
}, { timestamps: { updatedAt: false } })


const Organization = mongoose.model('Organization', organizationSchema)

module.exports = Organization