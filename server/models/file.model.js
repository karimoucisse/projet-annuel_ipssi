const mongoose = require('mongoose');

const { Schema } = mongoose;

const fileSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        fileSize: {
            type: Schema.Types.Decimal128,
            required: true,
        },
        fileExtension: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
