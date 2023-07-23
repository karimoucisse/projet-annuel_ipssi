const router = require('express').Router();
const authorization = require('../middlewares/authorization.mid');
const isFileInDatabase = require('../middlewares/isFileInDatabase.mid');
const fileController = require('../controllers/file.controller');

router.get(
    '/detail/:fileId',
    authorization,
    isFileInDatabase,
    async (req, res, next) => {
        try {
            res.status(200).json(req.file);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:userId', authorization, async (req, res, next) => {
    try {
        await fileController.getFiles(req, res, next);
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
