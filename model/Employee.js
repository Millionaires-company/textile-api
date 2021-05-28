const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    emplName: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 5,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization'
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
    },
    salaryType: {
        type: String,
        required: true,
        lowercase: true,
    },
    role: {
        type: String,
        required: true,
        lowercase: true,
    },
    salaryUnitPrice: {
        type: Number,
    },
}, { timestamps: { updatedAt: false } })


const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee