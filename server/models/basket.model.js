const mongoose = require('mongoose');

const { Schema } = mongoose;

const basketSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        subscriptionId: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
            required: true,
        },
    },
    { timestamps: true }
);

const Basket = mongoose.model('Basket', basketSchema);

module.exports = Basket;
