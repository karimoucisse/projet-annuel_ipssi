const Subscription = require('../models/subscription.model');

const getSubscriptions = async (req, res) => {
    // TODO: MODIFIER TABLE SUBSCRIPTION => LORSQUE L'UTILISATEUR RACHETE DU STOCKAGE MODIFIER SA LIGNE DANS LA BDD
    // MAIS CREER UNE AUTRE LIGNE POUR LES FACTURES
    const getAllSubscriptions = await Subscription.find();
    let data = {};
    getAllSubscriptions.map(subscription => {
        data[subscription.userId] = {};
        data[subscription.userId]['storage'] = subscription.storage;
    })
    res.status(200).json(data);
}

module.exports.getSubscriptions = getSubscriptions;