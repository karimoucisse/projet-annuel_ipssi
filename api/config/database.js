const mongoose = require('mongoose')
require('dotenv').config()

const { MONGODB_URI } = process.env

const connectToMongodb = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connection to MongoDB successful !')
    } catch (error) {
        console.log('Connection to MongoDB failed !')
    }
}

module.exports = { connectToMongodb }
