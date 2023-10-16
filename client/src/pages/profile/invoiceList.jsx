import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './storage';
import Button from '@mui/material/Button';
// TODO à revoir
const PDFViewerButton = () => {
    const [showPDF, setShowPDF] = useState(false);

    const handleClick = () => {
        setShowPDF(true);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClick}>
                Afficher le PDF
            </Button>
            {showPDF && (
                <PDFViewer width="100%" height={500}>
                    <MyDocument />
                </PDFViewer>
            )}
        </div>
    );
};

export default PDFViewerButton;
