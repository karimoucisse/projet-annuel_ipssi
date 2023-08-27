const File = require('../models/file.model');

const getFiles = async (req, res) => {
    const getFilesByUser = await File.find({ userId: req.user.id });
    res.status(200).json(getFilesByUser);
};

const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        if (file.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await file.delete();
        return res.status(202).json({ message: 'File removed' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
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
};

module.exports.getFiles = getFiles;
module.exports.deleteFile = deleteFile;
module.exports.createFile = createFile;
