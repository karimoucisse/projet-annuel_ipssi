import Axios from "./caller.service";

const InvoiceService = {
    getInvoices: async () => {
        try {
            const response = await Axios.get('/invoices');
            return response;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des factures.');
        }
    },
    getInvoicePDF: async (invoiceId) => {
        try {
            const response = await Axios.get(`/invoices/${invoiceId}/pdf`, {
                responseType: 'arraybuffer', // Indique que la réponse est un fichier binaire
            });
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors du téléchargement de la facture au format PDF.');
        }
    },
    getInvoiceDetails: async (invoiceId) => {
        try {
            const response = await Axios.get(`/invoices/${invoiceId}`);
            // console.log("getInvoiceDetails ==========================> ", response.data)
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des détails de la facture.');
        }
    },
};

export default InvoiceService;
