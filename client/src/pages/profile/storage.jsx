import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import { accountService } from '../../_services/account.service';

const Storage = () => {
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
        <Container maxWidth="md" style={{ padding: '16px', margin: '20px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px' }}>
            <Box display="flex" alignItems="center">
                <CalendarMonthIcon sx={{ fontSize: 24, marginRight: 1 }} />
                <Typography variant="body1">Date :</Typography>
                <Typography>{invoiceDate}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <StorageIcon sx={{ fontSize: 24, marginRight: 1 }} />
                <Typography variant="body1">Espace de stockage total :</Typography>
                <Typography>{userStorage && userStorage.sum * 20}Go</Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <PaidIcon sx={{ fontSize: 24, marginRight: 1 }} />
                <Typography variant="body1">Prix total :</Typography>
                <Typography>{userStorage && userStorage.storage[0].price / 100 * userStorage.sum} €</Typography>
            </Box>
        </Container>
    );
};

export default Storage;
