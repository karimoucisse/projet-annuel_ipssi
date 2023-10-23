import React, { useEffect, useRef, useState } from "react";
import { invoiceService } from "../../_services/invoice.service";

const ListInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const flag = useRef(false);

    useEffect(() => {
        if(flag.current === false){
            invoiceService.getInvoices()
                .then(res => {
                    console.log(res.data);
                    setInvoices(res.data);
                })
                .catch(err => console.log(err));
        }

        return () => flag.current = true;
    }, []);

    const downloadInvoice = async (invoiceId) => {
        await invoiceService.getInvoice(invoiceId)
            .then((res) => {
                console.log(res);
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'invoice.pdf'); // TODO: revoir nom
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    } 



    return (
        <div>
            Liste des factures
            <table>
                <thead>
                    <tr>
                        <th>Prix unitaire</th>
                        <th>Quantité</th>
                        <th>Désignation</th>
                        <th>Taxe</th>
                        <th>Date</th>
                        <th>Télécharger</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        invoices.map(invoice => (
                            <tr key={invoice._id}>
                                <td>{invoice.unitPrice / 100}€</td>
                                <td>{invoice.quantity}</td>
                                <td>{invoice.designation}</td>
                                <td>{invoice.tax['$numberDecimal']}</td>
                                <td>{invoice.createdAt}</td>
                                <td><button onClick={() => downloadInvoice(invoice._id)}>Télécharger</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListInvoices;