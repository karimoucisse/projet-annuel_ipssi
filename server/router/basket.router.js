const router = require('express').Router();
const basketController = require('../controllers/basket.controller');

router.get('/:userId', async (req, res, next) => {
    try {
        await basketController.getBasketByUserId(req, res, next);
    } catch (error) {
        next(error);
    }
});
