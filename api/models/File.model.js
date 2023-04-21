const { Schema, model } = require('mongoose')

const fileSchema = new Schema({
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
        type: Number,
        required: true,
    },
    extension: {
        type: String,
        required: true,
    },
})

const File = model('File', fileSchema)
module.exports = File
