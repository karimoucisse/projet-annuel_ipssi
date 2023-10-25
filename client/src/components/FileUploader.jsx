import React, { useState } from 'react';
import { Button, Typography, Paper, Grid, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

const FileUpload = ({ onUpload }) => {
    const [dragging, setDragging] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer.files;
        onUpload(files[0]);
        setFileUploaded(true);
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        onUpload(file);
        setFileUploaded(true);
    };

    const styles = {
        cloudUploaderIcon: {
            fontSize: 100,
            color: '#1c2930',
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                textAlign: 'center',
                paddingBottom: 2,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: `3px dashed ${fileUploaded ? 'green' : '#fff'}`,
                transition: 'border .3s',
                width: "100%",
                marginBlock: "20px",
                boxShadow: "none"
            }}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {fileUploaded ? (
                <Box>
                    <CloudDoneIcon sx={styles.cloudUploaderIcon} />
                    <Typography variant="h6" gutterBottom>Fichier téléchargé</Typography>
                </Box>
            ) : dragging ? (
                <Box>
                    <CloudUploadIcon sx={styles.cloudUploaderIcon} />
                    <Typography variant="h6" gutterBottom>Faites glisser le fichier ici</Typography>
                </Box>
            ) : (
                <Box>
                    <CloudUploadIcon sx={styles.cloudUploaderIcon} />
                    <Typography variant="h6" gutterBottom>Sélectionner un fichier</Typography>
                    <input
                        type="file"
                        id="fileInput"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileInput}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="fileInput">
                        <Button variant="contained" component="span">
                            Parcourir
                        </Button>
                    </label>
                </Box>
            )}
        </Paper>
    );
};

export default FileUpload;
