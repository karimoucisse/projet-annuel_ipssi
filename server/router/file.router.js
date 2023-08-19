const router = require('express').Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');
const authorization = require('../middlewares/authorization.mid');
const isFileInDatabase = require('../middlewares/isFileInDatabase.mid');
const fileController = require('../controllers/file.controller');

const { MONGO_URI } = process.env;

const conn = mongoose.createConnection(MONGO_URI);
let gfs;
let gridfsBucket;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
});

const storage = new GridFsStorage({
    url: MONGO_URI,
    file: (req, file) =>
        new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            });
        }),
});
const upload = multer({ storage });

// router.get(
//    '/detail/:fileId',
//    authorization,
//    isFileInDatabase,
//    async (req, res, next) => {
//        try {
//            res.status(200).json(req.file);
//        } catch (error) {
//            next(error);
//        }
//    }
// );

router.get('/files', authorization, async (req, res, next) => {
    try {
        await fileController.getFiles(req, res, next);
    } catch (error) {
        next(error);
    }
});

// router.delete(
//    '/:fileId',
//    authorization,
//    isFileInDatabase,
//    async (req, res, next) => {
//        try {
//            await fileController.deleteFile(req, res, next);
//        } catch (error) {
//            next(error);
//        }
//    }
// );

router.post(
    '/upload',
    authorization,
    upload.single('file'),
    async (req, res, next) => {
        try {
            await fileController.createFile(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist',
            });
        }

        // Files exist
        return res.json(files);
    });
});

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

router.get('/stream/:filename', async (req, res) => {
    // TODO: Faille de sécurité, on ne vérifie pas si le fichier provient bien de cet utilisateur connecté, dans tous les cas, il faut une autorisation pour afficher le fichier
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file || file.length === 0) {
        return res.status(404).json({
            err: 'No file exists',
        });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } else {
        res.status(404).json({
            err: 'Not an image',
        });
    }
});

router.delete(
    '/files/:id',
    authorization,
    isFileInDatabase,
    async (req, res, next) => {
        // Ajouter sécurité
        await gfs.remove(
            { filename: req.file.fileid, root: 'uploads' },
            (err, gridStore) => {
                if (err) {
                    return res.status(404).json({ err });
                }
            }
        );
        try {
            await fileController.deleteFile(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
