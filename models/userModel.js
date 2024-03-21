const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,

    },
    is_Online: {
        type: String,
        default:"0"
    }

}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User