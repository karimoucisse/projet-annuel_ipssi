import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { accountService } from '../../_services/account.service';
import StorageIcon from '@mui/icons-material/Storage';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import { Link } from 'react-router-dom';
import PDFViewerButton from './invoiceList';
// TODO à modifier
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(50px)', // Flou
        margin: 20,
        display: 'flex',
    },
    section: {
        width: 200,
        padding: 20,
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        fontSize: 24,
        marginRight: 8,
    },
    text: {
        marginRight: 5
    }
});

// Create Document Component
const MyDocument = () => {
    const [userStorage, setUserStorage] = useState(null);
    const [invoiceDate, setInvoiceDate] = useState(null);

    const fetchUserStorage = async () => {
        accountService.getStorage()
            .then(res => {
                console.log(res.data);
                setUserStorage(res.data);

                const dateActuelle = new Date(res.data.storage[0].createdAt);

                const jour = dateActuelle.getDate();
                const mois = dateActuelle.getMonth() + 1;
                const annee = dateActuelle.getFullYear();

                const formatedDate = `${jour.toString().padStart(2, '0')}/${mois.toString().padStart(2, '0')}/${annee}`;

                setInvoiceDate(formatedDate);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchUserStorage();
    }, [invoiceDate]);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <CalendarMonthIcon style={styles.icon} />
                    <Text style={styles.text}>Date :</Text>
                    <Text>{invoiceDate}</Text>
                </View>
                <View style={styles.section}>
                    <StorageIcon style={styles.icon} />
                    <Text style={styles.text}>Espace de stockage total :</Text>
                    <Text>{userStorage && userStorage.sum * 20}Go</Text>
                </View>
                <View style={styles.section}>
                    <PaidIcon style={styles.icon} />
                    <Text style={styles.text}>Prix total :</Text>
                    <Text>{userStorage && userStorage.storage[0].price / 100 * userStorage.sum} €</Text>
                </View>
                <PDFViewerButton />
            </Page>
        </Document>
    );
};

export default MyDocument;
