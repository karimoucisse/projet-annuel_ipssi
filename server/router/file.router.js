const router = require('express').Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const {GridFsStorage} = require('multer-gridfs-storage');
const path = require('path');
const authorization = require('../middlewares/authorization.mid');
const isFileInDatabase = require('../middlewares/isFileInDatabase.mid');
const fileController = require('../controllers/file.controller');

const { MONGO_URI } = process.env;

const conn = mongoose.createConnection(MONGO_URI);
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

const storage = new GridFsStorage({
    url: MONGO_URI,
    file: (req, file) =>
        new Promise((resolve, reject) => {
            const filename = path.extname(file.originalname);
            const fileInfo = {
                filename,
                bucketName: 'uploads',
            };
            resolve(fileInfo);
        }),
});
const upload = multer({ storage });

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

router.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

router.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // On vérifie si les fichiers existent
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist',
            });
        }

        // les fichiers existent
        return res.json(files);
    });
});

module.exports = router;
