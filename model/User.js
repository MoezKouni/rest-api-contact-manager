const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    address: String,
    age: Number,
    sexe: String,
    avatar: String,
    email: String,
    password: String,
    phone: String,
    created_at: {
        type: Date,
        default: Date.now
    },
})


const users = mongoose.model('user', UserSchema)
module.exports = users