import React, { useEffect, useRef, useState } from "react";
import { invoiceService } from "../../_services/invoice.service";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Typography,
} from "@mui/material";

const ListInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const flag = useRef(false);

    useEffect(() => {
        if (flag.current === false) {
            invoiceService
                .getInvoices()
                .then((res) => {
                    console.log(res.data);
                    setInvoices(res.data);
                })
                .catch((err) => console.log(err));
        }

        return () => (flag.current = true);
    }, []);

    const downloadInvoice = async (invoiceId) => {
        await invoiceService
            .getInvoice(invoiceId)
            .then((res) => {
                console.log(res);
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "invoice.pdf"); // TODO: revoir le nom
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div
            style={{
                height: "calc(100vh - 70px)",
                overflowY: "auto",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Liste des factures
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Prix unitaire</TableCell>
                        <TableCell>Quantité</TableCell>
                        <TableCell>Désignation</TableCell>
                        <TableCell>Taxe</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Télécharger</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice._id}>
                            <TableCell>{(invoice.unitPrice / 100).toFixed(2)}€</TableCell>
                            <TableCell>{invoice.quantity * 20}Go</TableCell>
                            <TableCell>{invoice.designation}</TableCell>
                            <TableCell>{parseFloat(invoice.tax["$numberDecimal"])}%</TableCell>
                            <TableCell>
                                {new Date(invoice.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    onClick={() => downloadInvoice(invoice._id)}
                                >
                                    Télécharger
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ListInvoices;
