const express = require('express')
const connectDB = require('./helpers/connectDB')

connectDB()
const app = express()

app.use(express.json())

app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/person', require('./routes/person'))


const PORT = process.env.PORT || 3002
app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server is running on port ${PORT}`)
})