const Basket = require('../models/basket.model');
const Subscription = require('../models/subscription.model');

const getBasketByUserId = async (req, res) => {
    const basket = await Basket.findOne({ userId: req.params.userId });
    const subscription = await Subscription.findOne({
        _id: basket.subscriptionId,
    });
    return res.status(200).json(subscription);
};

const deleteBasketByUserId = async (req, res) => {
    await Basket.deleteOne({ userId: req.params.userId });
    return res.status(202).json({ message: 'Basket deleted !' });
};

module.exports.getBasketByUserId = getBasketByUserId;
module.exports.deleteBasketByUserId = deleteBasketByUserId;
