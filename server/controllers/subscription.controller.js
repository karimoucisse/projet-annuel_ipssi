const Subscription = require('../models/subscription.model');
const File = require('../models/file.model');

const getSubscriptions = async (req, res) => {
    // TODO: MODIFIER TABLE SUBSCRIPTION => LORSQUE L'UTILISATEUR RACHETE DU STOCKAGE MODIFIER SA LIGNE DANS LA BDD
    // MAIS CREER UNE AUTRE LIGNE POUR LES FACTURES
    const getAllSubscriptions = await Subscription.find();
    const data = {};
    getAllSubscriptions.map((subscription) => {
        data[subscription.userId] = {};
        data[subscription.userId].storage = subscription.storage;
    });
    res.status(200).json(data);
};

const getSizes = async (req, res) => {
    const getAllSizesGroupByUser = await File.aggregate([
        {
            $group: {
                _id: '$userId',
                totalSize: { $sum: { $toDouble: '$fileSize' } },
            },
        },
    ]);
    const data = {};
    getAllSizesGroupByUser.map((sizeByUser) => {
        data[sizeByUser._id] = {};
        data[sizeByUser._id].currentUsage = sizeByUser.totalSize;
        data[sizeByUser._id].currentUsageInKB = sizeByUser.totalSize / 1024;
        data[sizeByUser._id].currentUsageInMB =
            sizeByUser.totalSize / (1024 * 1024);
        data[sizeByUser._id].currentUsageInGB =
            sizeByUser.totalSize / (1024 * 1024 * 1024);
    });
    res.status(200).json(data);
};

module.exports.getSubscriptions = getSubscriptions;
module.exports.getSizes = getSizes;
