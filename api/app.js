require('dotenv').config()
const express = require('express')
const { connectToMongodb } = require('./config/database')

const app = express()
const PORT = process.env.PORT || 5000

connectToMongodb()

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})
