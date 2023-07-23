const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        storage: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
