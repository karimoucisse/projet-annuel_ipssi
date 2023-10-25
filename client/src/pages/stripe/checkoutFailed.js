import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';

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
        borderRadius: '10px',
    },
    content: {
        textAlign: 'center',
    },
    errorIcon: {
        fontSize: 50,
        color: '#1c2930',
        verticalAlign: 'middle',
        marginLeft: '12px',
        paddingBottom: '12px'
    },
};

const CheckoutFailed = () => {
    return (
        <Container maxWidth="sm" sx={styles.container}>
            <Box sx={styles.content}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Erreur lors du règlement
                    </Typography>
                    <ErrorIcon sx={styles.errorIcon} />
                </Box>
                <Typography variant="body1" paragraph>
                    Une erreur s'est produite. Veuillez réessayer plus tard.
                </Typography>
                <Button
                    component={Link}
                    to="/auth/signup"
                    variant="contained"
                    color="primary"
                >
                    Retour à l'inscription
                </Button>
            </Box>
        </Container>
    );
};

export default CheckoutFailed;
