const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const authorization = require('../middlewares/authorization.mid');
const isAdmin = require('../middlewares/isAdmin.mid');

router.get('/users', authorization, isAdmin, async (req, res, next) => {
    try {
        await adminController.getUsers(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/user/:userId', authorization, async (req, res, next) => {
    try {
        await adminController.getUserFiles(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/statistics', authorization, async (req, res, next) => {
    // TODO: REMETTRE ISADMIN MIDDLEWARE
    try {
        await adminController.getStatistics(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
