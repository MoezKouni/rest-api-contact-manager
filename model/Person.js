const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Personchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    firstname: String,
    lastname: String,
    address: String,
    age: Number,
    sexe: String,
    avatar: String,
    email: String,
    phone: String,
    relation: String,
    occupation: String,
    isPublic: Boolean,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})


const person = mongoose.model('person', Personchema)
module.exports = person