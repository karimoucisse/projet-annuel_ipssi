const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const File = require('../models/file.model');
const { conn } = require('../services/gridfs/gfs.service');

const getFiles = async (req, res) => {
    const files = await File.find({ userId: req.user.userId });
    res.status(200).json(files);
};

const searchFiles = async (req, res) => {
    const searchText = req.query.text;
    const files = await File.find({
        userId: req.params.userId,
        name: { $regex: searchText, $options: 'i' },
    });
    return res.status(200).json(files);
};

const deleteFile = async (req, res) => {
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    const fileToDelete = await gfs.files.findOne({ filename: req.file.fileId });
    console.log(fileToDelete);
    const gsfb = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
    gsfb.delete(fileToDelete._id, (err, gridStore) => {
        if (err) return next(err);
    });
    await File.findByIdAndDelete(req.file._id);
    return res.status(202).json({ message: 'File removed' });
};

const createFile = async (req, res) => {
    console.log('je suis là');
    await File.create({
        userId: req.user.userId, // req.params.userId,
        fileId: req.file.filename,
        name: req.file.originalname,
        fileSize: req.file.size,
        fileExtension: req.file.contentType,
    });
    return res.status(201).json({ message: 'File uploaded' });
};

module.exports.getFiles = getFiles;
module.exports.deleteFile = deleteFile;
module.exports.createFile = createFile;
module.exports.searchFiles = searchFiles;
