const router = require('express').Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
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
            const filename = file.originalname;
            const fileInfo = {
                filename,
                bucketName: 'uploads',
            };
            resolve(fileInfo);
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

// router.get('/:userId', authorization, async (req, res, next) => {
//    try {
//        await fileController.getFiles(req, res, next);
//    } catch (error) {
//        next(error);
//    }
// });

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

router.post('/upload', upload.single('file'), (req, res) => {
    console.log('je suis là');
    res.json({ file: req.file });
});

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

router.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists',
            });
        }
        // File exists
        return res.json(file);
    });
});

router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists',
            });
        }

        // Check if image
        if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'
        ) {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image',
            });
        }
    });
});

router.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err });
        }

        res.redirect('/');
    });
});

module.exports = router;
