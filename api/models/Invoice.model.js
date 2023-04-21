const { Schema, model } = require('mongoose')

const invoiceSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
})

const Invoice = model('Invoice', invoiceSchema)
module.exports = Invoice
