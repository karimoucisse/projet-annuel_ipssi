const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        role: {
            type: String,
            default: 'USER',
        },
        subscription: {
            type: Schema.Types.ObjectId,
            ref: 'Subcription',
        },
        active: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
