const Invoice = require('../models/invoice.model');
const User = require('../models/user.model');
const Address = require('../models/address.model');
const { makePDF } = require('../services/invoice.service');

const getInvoices = async (req, res) => {
    const invoices = await Invoice.find({ userId: req.user.userId });
    if (!invoices) {
        return res.status(404).json({ error: 'Aucune facture trouvée.' });
    }
    res.status(200).json(invoices);
};

const generatePDF = async (req, res) => {
    const invoiceData = await Invoice.findById(req.params.invoiceId);
    if (!invoiceData) {
        return res.status(400).json({ error: 'Invoice not in database' });
    }
    const user = await User.findById(req.user.userId);
    const address = await Address.findOne({ userId: req.user.userId });
    const binaryResult = await makePDF(user, address, invoiceData);
    res.contentType('application/pdf').send(binaryResult);
};

module.exports.getInvoices = getInvoices;
module.exports.generatePDF = generatePDF;
