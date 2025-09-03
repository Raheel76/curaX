const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [20, "Name cannot exceed 20 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        select: false,
        minlength: [4, "Password must be at least 4 characters"]
    },
    role: {
        type: String,
        enum: ['patient', 'admin', 'doctor'],
        default: 'patient'
    },
    gender: {
        type: String,
        required: [true, "Select you gender"],
    },
    mobileNumber: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return v ? /^\+?\d{10,}$/.test(v) : true;
            },
            message: "Please provide a valid mobile number"
        }
    },
    address: {
        type: String,
        trim: true,
        maxlength: [200, "Address cannot exceed 200 characters"]
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next()
})

module.exports = mongoose.model('Users', userSchema)