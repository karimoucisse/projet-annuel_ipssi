const File = require('../models/file.model');
const { deleteFileFromGrid, getFileFromGrid } = require('../services/file.service');

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
    await deleteFileFromGrid(req);
    await File.findByIdAndDelete(req.file._id);
    return res.status(202).json({ message: 'File removed' });
};

const createFile = async (req, res) => {
    await File.create({
        userId: req.user.userId, // req.params.userId,
        fileId: req.file.filename,
        name: req.file.originalname,
        fileSize: req.file.size,
        fileExtension: req.file.contentType,
    });
    return res.status(201).json({ message: 'File uploaded' });
};

const streamFile = async (req, res) => {
    const readStream = await getFileFromGrid(req);
    readStream.pipe(res);
};

const downloadFile = async (req, res) => { // TODO: REVOIR CETTE FONCTION
    const readStream = await getFileFromGrid(req);
    let base64;
    readStream.on('data', (data) => {
        base64 = data.toString('base64');
        res.send(base64);
    });
    //readStream.on('end', () => {
    //    res.send(base64);
    //});
}

module.exports.getFiles = getFiles;
module.exports.deleteFile = deleteFile;
module.exports.createFile = createFile;
module.exports.searchFiles = searchFiles;
module.exports.streamFile = streamFile;
module.exports.downloadFile = downloadFile;