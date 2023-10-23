const File = require('../models/file.model');

const getFiles = async (req, res) => {
    const files = await File.find({ userId: req.user.userId });
    res.status(200).json(files);
};

const searchFiles = async (req, res) => {
    const searchText = req.query.text;
    const files = await File.find({userId: req.params.userId, name: { $regex: searchText, $options: 'i' }});
    return res.status(200).json(files);
};

const deleteFile = async (req, res) => {
    await File.findByIdAndDelete(req.params.fileId);
    return res.status(202).json({ message: 'File removed' });
};

const createFile = async (req) => {
    console.log('je suis là');
    await File.create({
        userId: req.user.userId, // req.params.userId,
        fileId: req.file.filename,
        name: req.file.originalname,
        fileSize: req.file.size,
        fileExtension: req.file.contentType,
    });
};

module.exports.getFiles = getFiles;
module.exports.deleteFile = deleteFile;
module.exports.createFile = createFile;
module.exports.searchFiles = searchFiles;
