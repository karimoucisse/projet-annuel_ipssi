const File = require('../models/file.model');
const User = require('../models/user.model');
const { getParams, filesByUserQuery, createdTodayQuery } = require('../services/admin.service');

const getUsers = async (req, res) => {
    const getUsersWithSubscription = await User.find().populate('subscription');
    res.status(200).json(getUsersWithSubscription);
};

const getUserFiles = async (req, res) => {
    console.log(req.query);
    let getFilesByUserId;
    if(req.query.extension != '' && req.query.extension != undefined){
        getFilesByUserId = await File.find({userId: req.params.userId, fileExtension: req.query.extension});
    }
    else if(req.query.param != '' && req.query.extension != undefined){
        const sortParam = req.query.param;
        const sortDirection = parseInt(req.query.direction);
        const sortObject = {};
        sortObject[sortParam] = sortDirection;
        getFilesByUserId = await File.find({userId: req.params.userId}).sort(sortObject);
    }
    else {
        getFilesByUserId = await File.find({ userId: req.params.userId });
    }
    console.log(getFilesByUserId);
    
    return res.status(200).json(getFilesByUserId);
};

const getStatistics = async (req, res) => {
    const countFiles = await File.countDocuments({});
    const countUsers = await User.countDocuments({});
    const filesByUser = await File.aggregate(filesByUserQuery);
    const nbFilesToday = await File.countDocuments(createdTodayQuery());

    res.status(200).json({
        countFiles,
        countUsers,
        filesByUser,
        nbFilesToday
    });

    // TODO: FAIRE BIEN PLUS D'AUTRES REQUETES POUR LES STATISTIQUES
    // Inscription sur le mois (Graphique)
    // Nombre de fichiers uploadés sur le mois (Graphique)
};

module.exports.getUsers = getUsers;
module.exports.getUserFiles = getUserFiles;
module.exports.getStatistics = getStatistics;
