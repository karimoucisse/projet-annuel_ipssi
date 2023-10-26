const PdfMake = require('pdfmake');
const Invoice = require('../models/invoice.model');
const User = require('../models/user.model');
const Address = require('../models/address.model');

const getInvoices = async (req, res) => {
    const invoices = await Invoice.find({ userId: req.user.userId });
    res.status(200).json(invoices);
};

const generatePDF = async (req, res) => {
    const invoiceData = await Invoice.findById(req.params.invoiceId);
    if (!invoiceData) {
        return res.status(400).json({ error: 'Invoice not in database' });
    }
    const user = await User.findById(req.user.userId);
    const address = await Address.findOne({ userId: req.user.userId });

    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique',
        },
    };
    const printer = new PdfMake(fonts);
    const docDefinition = {
        content: [
            `Informations utilisateur
            Nom: ${user.firstname} ${user.lastname}
            Email: ${user.email}
            Phone: ${user.phone}
            Adresse
            ${address.addressName}
            ${address.postalCode} ${address.city}, ${address.state}
            ${address.country}
            Société
            Désignation: ArchiConnect
            Numéro de siret: 161803398875
            Adresse: 25 RUE CLAUDE TILLIER, 75012 PARIS, FRANCE
            Description
            Designation: ${invoiceData.designation}
            Prix à l'unité: ${invoiceData.unitPrice}
            Quantité: ${invoiceData.quantity}`,
        ], // TODO: METTRE TAXE
        defaultStyle: {
            font: 'Helvetica',
        },
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
<<<<<<< HEAD
    const binaryResult = await new Promise((resolve, reject) =>{ 
    try {
        let chunks = [];
        pdfDoc.on('data', chunk => chunks.push(chunk));
        pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
        pdfDoc.end();
    } catch(err) {
        reject(err);
    }});
=======
    const binaryResult = await new Promise((resolve, reject) => {
        try {
            const chunks = [];
            pdfDoc.on('data', (chunk) => chunks.push(chunk));
            pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
            pdfDoc.end();
        } catch (err) {
            reject(err);
        }
    });
>>>>>>> 57bd9ce041ea7d8b42b3a6d67d67a797ac876add
    res.contentType('application/pdf').send(binaryResult);
};

module.exports.getInvoices = getInvoices;
module.exports.generatePDF = generatePDF;
