const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    wayType: {
        type: Number,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    addressName: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
