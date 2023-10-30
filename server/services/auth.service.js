const mongoose = require('mongoose');

const deleteFiles = async (gfs, files) => {
    files.map(
    async (file) => {
        const fileToDelete = await gfs.files.findOne({ filename: file.fileId });
        const gsfb = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
        gsfb.delete(fileToDelete._id, function (err, gridStore) {
            if (err) return next(err);
        });
    });
}

module.exports.deleteFiles = deleteFiles;