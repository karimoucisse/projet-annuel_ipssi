const router = require('express').Router();
const invoiceController = require('../controllers/invoice.controller');
const authorization = require('../middlewares/authorization.mid');

router.get('/', authorization, async (req, res, next) => {
    try {
        await invoiceController.getInvoices(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get(
    '/generate-pdf/:invoiceId',
    authorization,
    async (req, res, next) => {
        try {
            await invoiceController.generatePDF(req, res);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
