const { Schema, model } = require('mongoose');

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    hospital: {
        name: {
            type: String,
            required: true
        },
        adress: {
            type: String,
            required: true
        },
        number: {
            type: String,
        }
    },
});

module.exports = model('User', user);