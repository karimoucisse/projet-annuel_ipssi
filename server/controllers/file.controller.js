const File = require('../models/file.model');

const getFiles = async (req, res) => {
    const getFilesByUser = await File.find({ userId: req.params.userId });
    res.status(200).json(getFilesByUser);
};

const deleteFile = async (req, res) => {
    await File.findByIdAndDelete(req.params.fileId);
    return res.status(202).json({ message: 'File removed' });
};

const createFile = async (req, res) => {
    res.json({ file: req.file });
    await File.create({
        userId: '641da2ea18c64178b07ee515', // req.params.userId,
        fileId: req.file.id,
        name: req.file.originalname,
        fileSize: req.file.size,
        fileExtension: req.file.contentType,
    });
};

module.exports.getFiles = getFiles;
module.exports.deleteFile = deleteFile;
module.exports.createFile = createFile;
