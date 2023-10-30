const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authorization = require('../middlewares/authorization.mid');
const login = require('../middlewares/login.mid');
const subscriptionIsValid = require('../middlewares/subscriptionIsValid.mid');
const { openConnection } = require('../services/gridfs/gfs.service');

router.post('/signup', subscriptionIsValid, async (req, res, next) => {
    try {
        await authController.signup(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/login', login, async (req, res, next) => {
    try {
        await authController.login(req, res, next);
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
        await authController.updateUserAndAddress(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
