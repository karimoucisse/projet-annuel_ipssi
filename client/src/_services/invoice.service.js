import Axios from './caller.service';

let getInvoices = () => {
    return Axios.get('/invoice');
}

let getInvoice = (invoiceId) => {
    return Axios.get('/invoice/generate-pdf/'+invoiceId, { responseType: 'blob' });
}
export const invoiceService = {
    getInvoices,
    getInvoice
}