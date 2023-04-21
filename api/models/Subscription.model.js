const { Schema, model } = require('mongoose')

const subscriptionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    storageSize: {
        type: Number,
        required: true,
    },
})

const Subscription = model('Subscription', subscriptionSchema)
module.exports = Subscription
