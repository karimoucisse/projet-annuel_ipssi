const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { conn } = require('./gridfs/gfs.service');

const deleteFileFromGrid = async (req) => {
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    const fileToDelete = await gfs.files.findOne({ filename: req.file.fileId });
    const gsfb = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
    gsfb.delete(fileToDelete._id, (err, gridStore) => {
        if (err) return next(err);
    });
}

module.exports.deleteFileFromGrid = deleteFileFromGrid;