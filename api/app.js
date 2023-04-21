require('dotenv').config()
const express = require('express')
const { connectToMongodb } = require('./config/database')

const app = express()
const PORT = process.env.PORT || 5000

connectToMongodb()

app.use(() => {
    console.log(`Serveur is running on port ${PORT}`)
})
