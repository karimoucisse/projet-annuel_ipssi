const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { conn } = require('./gridfs/gfs.service');

const getFileFromGrid = async (req) => {
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    const gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file || file.length === 0) {
        return res.status(404).json({
            err: 'No file exists',
        });
    }
    const readStream = gridfsBucket.openDownloadStream(file._id);
    return readStream;
}

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

module.exports.getFileFromGrid = getFileFromGrid;
module.exports.deleteFileFromGrid = deleteFileFromGrid;