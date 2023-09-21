const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model("Users", userSchema);