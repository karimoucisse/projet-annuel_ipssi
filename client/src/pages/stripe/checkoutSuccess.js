import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '35vh',
        marginTop: '32.5vh',
        marginBottom: '32.5vh',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '10px'
    },
    content: {
        textAlign: 'center',
    },
    checkIcon: {
        fontSize: 50,
        color: '#1c2930',
        verticalAlign: 'middle',
        marginLeft: '12px',
        paddingBottom: '12px'
    },
};

const CheckoutSuccess = () => {
    return (
        <Container maxWidth="sm" sx={styles.container}>
            <Box sx={styles.content}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={styles.text}>
                        Paiment effectué avec succès
                    </Typography>
                    <CheckCircleIcon sx={styles.checkIcon} />
                </Box>
                <Typography variant="body1" paragraph>
                    Félicitations !
                </Typography>
                <Button
                    component={Link}
                    to="/auth/login"
                    variant="contained"
                    color="primary"
                >
                    retour
                </Button>
            </Box>
        </Container>
    );
};

export default CheckoutSuccess;
