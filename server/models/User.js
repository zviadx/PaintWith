const { Schema, model } = require('mongoose')


const User = new Schema({
    user: { type: String, required: true },
    image: { type: String }
})

module.exports = model('User', User)