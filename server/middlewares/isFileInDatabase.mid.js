const File = require('../models/file.model');

const isFileInDatabase = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        if (file.userId.toString() !== '641da2ea18c64178b07ee515') { //  req.user.userId
            // On vient vérifier que le fichier appartient bien à l'utilisateur connecté
            return res.status(401).json({
                message: 'You are not authorized to access this file',
            });
        }
        req.file = file;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = isFileInDatabase;
