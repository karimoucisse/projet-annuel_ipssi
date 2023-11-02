const router = require('express').Router();
const authorization = require('../middlewares/authorization.mid');
const isFileInDatabase = require('../middlewares/isFileInDatabase.mid');
const fileController = require('../controllers/file.controller');
const {
    upload,
    openConnection,
} = require('../services/gridfs/gfs.service');

router.get('/files', authorization, async (req, res, next) => {
    try {
        await fileController.getFiles(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/search/:userId', authorization, async (req, res, next) => {
    try {
        await fileController.searchFiles(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.post(
    '/upload',
    authorization,
    openConnection,
    upload.single('file'),
    async (req, res, next) => {
        try {
            await fileController.createFile(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/files/:fileId',
    authorization,
    isFileInDatabase,
    async (req, res, next) => {
        try {
            return res.json(req.file);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/stream/:filename', openConnection, async (req, res, next) => {
    // TODO: Faille de sécurité, on ne vérifie pas si le fichier provient bien de cet utilisateur connecté, dans tous les cas, il faut une autorisation pour afficher le fichier
    try {
        await fileController.streamFile(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/download/:filename', openConnection, async (req, res, next) => {
    try {
        await fileController.downloadFile(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.delete(
    '/:fileId',
    authorization,
    isFileInDatabase,
    async (req, res, next) => {
        try {
            await fileController.deleteFile(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
