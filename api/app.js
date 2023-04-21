const express = require('express')

const app = express()
const PORT = 5000

app.use(() => {
    console.log(`Serveur is running on port ${PORT}`)
})
