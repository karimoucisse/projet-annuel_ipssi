const moment = require('moment');
const File = require('../models/file.model');
const User = require('../models/user.model');

const getUsers = async (req, res) => {
    const getUsersWithSubscription = await User.find().populate('subscription');
    res.status(200).json(getUsersWithSubscription);
};

const getUserFiles = async (req, res) => {
    console.log(req.query);
    let getFilesByUserId;
    if (req.query.extension != undefined) {
        console.log('izi');
        getFilesByUserId = await File.find({
            userId: req.params.userId,
            fileExtension: req.query.extension,
        });
    } else if (req.query.param != undefined) {
        console.log('pizi');
        const sortParam = req.query.param;
        const sortDirection = parseInt(req.query.direction);
        const sortObject = {};
        sortObject[sortParam] = sortDirection;
        getFilesByUserId = await File.find({ userId: req.params.userId }).sort(
            sortObject
        );
    } else {
        console.log('et non');
        getFilesByUserId = await File.find({ userId: req.params.userId });
    }

    return res.status(200).json(getFilesByUserId);
};

const getStatistics = async (req, res) => {
    const countFiles = await File.countDocuments({});
    const countUsers = await User.countDocuments({});
    const filesByUser = await File.aggregate([
        {
            $group: {
                _id: '$userId',
                count: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: 'users', // Nom de la collection d'utilisateurs
                localField: '_id', // Champ local pour la jointure (ici, _id de l'utilisateur)
                foreignField: '_id', // Champ de la collection d'utilisateurs à associer (ici, _id)
                as: 'user', // Le nom du champ dans le résultat de la jointure
            },
        },
        {
            $unwind: '$user', // Décompose le tableau résultant de la jointure en un objet unique
        },
        {
            $project: {
                _id: 1,
                count: 1,
                firstname: '$user.firstname', // Champ name de la collection d'utilisateurs
                lastname: '$user.lastname', // Champ lastName de la collection d'utilisateurs
            },
        },
    ]);

    const todayStart = moment().startOf('day').toDate();
    const todayEnd = moment().endOf('day').toDate();
    const nbFilesToday = await File.countDocuments({
        createdAt: {
            $gte: todayStart,
            $lte: todayEnd,
        },
    });

    const statistics = {};
    statistics.countFiles = countFiles;
    statistics.countUsers = countUsers;
    statistics.filesByUser = filesByUser;
    statistics.nbFilesToday = nbFilesToday;
    res.status(200).json({ statistics });
};

module.exports.getUsers = getUsers;
module.exports.getUserFiles = getUserFiles;
module.exports.getStatistics = getStatistics;
