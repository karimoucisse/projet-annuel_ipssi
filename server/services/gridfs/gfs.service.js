const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');

const { MONGO_URI } = process.env;

const conn = mongoose.createConnection(MONGO_URI);
let gfs;
let gridfsBucket;
const openConnection = (req, res, next) => {
    conn.once('open', () => {
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'uploads',
        });
    });
    next();
};

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

module.exports.upload = upload;
module.exports.openConnection = openConnection;
module.exports.conn = conn;
