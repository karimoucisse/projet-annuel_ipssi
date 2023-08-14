const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
    {
        storage: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
