const express = require('express')
require('dotenv').config()
require('./database')
const cors = require('cors')

const { PORT } = process.env || 3000

const app = express()

app.use(cors())

app.listen(PORT, () => {
    console.log(`=> server lauched on port : ${PORT}`)
})
