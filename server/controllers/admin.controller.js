const File = require('../models/file.model');
const User = require('../models/user.model');
const { getParams, filesByUserQuery, createdTodayQuery } = require('../services/admin.service');

const getUsers = async (req, res) => {
    const getUsersWithSubscription = await User.find().populate('subscription');
    res.status(200).json(getUsersWithSubscription);
};

const getUserFiles = async (req, res) => {
    const params = getParams(req);
    const getFilesByUserId = await File.find(params.params).sort(params.sortObject); // TODO: Tester fonction sort si aucun paramètre n'est passé
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
