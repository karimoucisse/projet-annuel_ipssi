const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authorization = require('../middlewares/authorization.mid');
const { openConnection } = require('../services/gridfs/gfs.service');

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

router.post('/storage', authorization, async (req, res, next) => {
    try {
        await authController.addStorage(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/storage', authorization, async (req, res, next) => {
    try {
        await authController.getStorage(req, res, next);
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
    } catch (error) {
        next(error);
    }
});

// route pour mettre à jour les informations de l'utilisateur
router.patch('/updateUser', authorization, async (req, res, next) => {
    try {
        await authController.updateUserAndAdress(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
