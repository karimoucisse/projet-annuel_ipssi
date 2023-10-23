const router = require('express').Router();
const subscriptionController = require('../controllers/subscription.controller');

router.get('/', async (req, res, next) => {
    try {
        await subscriptionController.getSubscriptions(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/current_size', async (req, res, next) => {
    try {
        await subscriptionController.getSizes(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
