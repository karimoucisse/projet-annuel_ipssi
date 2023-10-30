const PdfMake = require('pdfmake');

const makePDF = async (user, address, invoiceData) => {
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
    return binaryResult;
}

module.exports.makePDF = makePDF;