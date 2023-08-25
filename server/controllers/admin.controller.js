const File = require('../models/file.model');
const User = require('../models/user.model');

const getUsers = async (req, res) => {
    const getUsersWithSubscription = await User.find().populate('subscription');
    res.status(200).json(getUsersWithSubscription);
};

const getUserFiles = async (req, res) => {
    const getFilesByUserId = await File.find({ userId: req.params.userId });
    return res.status(200).json(getFilesByUserId);
};

const getStatistics = async (req, res) =>
    res.status(200).json({ message: 'statistics page' });

module.exports.getUsers = getUsers;
module.exports.getUserFiles = getUserFiles;
module.exports.getStatistics = getStatistics;
