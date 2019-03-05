/**
 * Require all modules and dependencies
 */
const mongoose = require('mongoose');

/**
 * Create user schema
 */
const User = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', User);