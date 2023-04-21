const { Schema, model } = require('mongoose')

const adressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    streetType: {
        type: String,
        required: true,
    },
    streetNumber: {
        type: Number,
        required: true,
    },
    streetName: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
})

const Adress = model('Adress', adressSchema)
module.exports = Adress
