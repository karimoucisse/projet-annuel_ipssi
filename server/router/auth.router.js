const router = require('express').Router();
const authController = require('../controllers/auth.controller');

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

router.get('/users', async (req, res, next) => { // TODO: ADD MIDDLEWARES (authorization et admin)
    try {
        await authController.getUsers(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('users/:userId', async (req, res, next) => { // TODO: ADD MIDDLEWARES (authorization et admin)
    try {
        await authController.getUserById(req, res, next);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
