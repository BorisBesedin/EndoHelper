const { Schema, model } = require('mongoose');

const photo = new Schema({
    author: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pathology: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = model('Photo', photo)