const router = require('express').Router();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const authorization = require('../middlewares/authorization.mid');
const isFileInDatabase = require('../middlewares/isFileInDatabase.mid');
const fileController = require('../controllers/file.controller');
const {
    conn,
    upload,
    openConnection,
} = require('../services/gridfs/gfs.service');
const File = require('../models/file.model');

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
    openConnection,
    upload.single('file'),
    async (req, res, next) => {
        console.log('heheheheheheheh');
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
            console.log('je devrais être ici aussi');
            return res.json(req.file);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/stream/:filename', openConnection, async (req, res, next) => {
    // TODO: Faille de sécurité, on ne vérifie pas si le fichier provient bien de cet utilisateur connecté, dans tous les cas, il faut une autorisation pour afficher le fichier
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    const gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
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
    openConnection,
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
