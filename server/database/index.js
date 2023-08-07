const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
require('dotenv').config();

const { MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch((err) => {
        console.error('Error connecting to mongo: ', err);
    });

const conn = mongoose.createConnection(MONGO_URI);
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

module.exports = mongoose;
