import Axios from './caller.service';

let getInvoices = () => {
    return Axios.get('/invoice');
}

let getInvoice = (invoiceId) => {
<<<<<<< HEAD
    return Axios.get('/invoice/generate-pdf/'+invoiceId, { responseType: 'blob' });
=======
    return Axios.get('/invoice/generate-pdf/' + invoiceId, { responseType: 'blob' });
>>>>>>> 57bd9ce041ea7d8b42b3a6d67d67a797ac876add
}
export const invoiceService = {
    getInvoices,
    getInvoice
}