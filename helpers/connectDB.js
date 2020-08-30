const mongoose = require('mongoose')
require('dotenv').config()

module.exports = () => {
    mongoose.connect(process.env.MONGOURI, { useFindAndModify:false, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            throw err
        }
        console.log('Database connected successfuly...')
    })
}