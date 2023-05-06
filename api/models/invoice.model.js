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
            type: Schema.Types.Decimal128,
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
            type: Schema.Types.Decimal128,
            required: true,
        },
    },
    { timestamps: true }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
