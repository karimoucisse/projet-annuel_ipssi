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
    res.status(200).json(data); // TODO: Si il y a qu'une seule subscription par utilisateur, pourquoi faire une boucle ???? 
};

const getSizes = async (req, res) => {
    const allSizesGroupByUser = await File.aggregate([
        {
            $group: {
                _id: '$userId',
                totalSize: { $sum: { $toDouble: '$fileSize' } },
            },
        },
    ]);
    
    const data = processSizeFilesData(allSizesGroupByUser);
    res.status(200).json(data);
};

module.exports.getSubscriptions = getSubscriptions;
module.exports.getSizes = getSizes;
