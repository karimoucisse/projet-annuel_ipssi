const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authorization = require('../middlewares/authorization.mid');

router.post('/signup', async (req, res, next) => {
    try {
        await authController.signup(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        await authController.login(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.delete('/:userId', async (req, res, next) => {
    try {
        await authController.deleteUser(req, res, next);
    } catch (error) {
        next(error);
    }
});

// Route pour l'achat d'espace de stockage supplémentaire
router.post('/purchase-space', authorization, async (req, res, next) => {
    try {
        const user = await authController.purchaseSpace(req.user.userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
