const File = require('../models/file.model');

const getFiles = async (req, res) => {
    const getFilesByUser = await File.find({ userId: req.params.userId });
    res.status(200).json(getFilesByUser);
};

const deleteFile = async (req, res) => {
    await File.findByIdAndDelete(req.params.fileId);
    return res.status(202).json({ message: 'File removed' });
};

module.exports.getFiles = getFiles;
module.exports.deleteFile = deleteFile;
