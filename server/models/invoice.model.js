const mongoose = require('mongoose');

const { Schema } = mongoose;

const invoiceSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        unitPrice: {
            type: Number,
            required: true,
            default: 2000,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        designation: {
            type: String,
            required: true,
            default: 'Subscription to ArchiConnect APP',
        },
        tax: {
            type: Schema.Types.Decimal128,
            required: true,
            default: 5,
        },
    },
    { timestamps: true }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
