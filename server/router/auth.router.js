const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authorization = require('../middlewares/authorization.mid');
<<<<<<< HEAD
const { openConnection } = require('../services/gridfs/gfs.service');
=======
>>>>>>> 8d652f6bca4389a4431ff9aa3a0e3f47efd10ebe

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

router.post('/addstorage', authorization, async (req, res, next) => {
    try {
        console.log('je suis là');
        await authController.addStorage(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.delete('/', authorization, openConnection, async (req, res, next) => {
    try {
        await authController.deleteUser(req, res, next);
    } catch (error) {
        next(error);
    }
});

<<<<<<< HEAD
router.get('/users', async (req, res, next) => {
    // TODO: ADD MIDDLEWARES (authorization et admin)
    try {
        await authController.getUsers(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('users/:userId', async (req, res, next) => {
    // TODO: ADD MIDDLEWARES (authorization et admin)
    try {
        await authController.getUserById(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/userinfo/:userId', async (req, res, next) => {
    try {
        await authController.getUserInfoById(req, res, next);
=======
// Route pour l'achat d'espace de stockage supplémentaire
router.post('/purchase-space', authorization, async (req, res, next) => {
    try {
        const user = await authController.purchaseSpace(req.user.userId);
        res.status(200).json(user);
>>>>>>> 8d652f6bca4389a4431ff9aa3a0e3f47efd10ebe
    } catch (error) {
        next(error);
    }
});

module.exports = router;
