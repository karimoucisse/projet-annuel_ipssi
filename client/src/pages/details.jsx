import { useEffect, useRef, useState } from "react";
import { fileService } from '../_services/file.service';
import { useParams } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import FilePreview from "../components/details/FilePreview";
import { Button, Typography, Paper } from "@mui/material";

// Styles using MUI
const styles = {
    detailContainer: {
        padding: '20px',
        backgroundColor: '#E4E4E4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    fileInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    filePreview: {
        marginTop: '20px',
    },
    downloadButton: {
        marginTop: '20px',
    },
};

const Details = () => {
    const [file, setFile] = useState([]);
    const flag = useRef(false);
    const { fileId } = useParams();
    const BASE_URL = 'http://localhost:3000/';

    const fetchData = async () => {
        await fileService.getFileById(fileId)
            .then(res => {
                console.log(res.data);
                setFile(res.data);
            })
            .catch(err => console.log(err));
    }

    const downloadFile = async (file) => {
        await fileService.downloadFile(file.fileId)
            .then((res) => {
                console.log(res.data);
                const url = `data:${file.fileExtension};base64,${res.data}`;
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.name);
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (flag.current === false) {
            fetchData();
        }

        return () => flag.current = true;
    }, []);

    return (
        <Paper style={styles.detailContainer}>
            <small>Fichier uploadé le {file.createdAt}</small>
            <Typography variant="h3">{file.name}</Typography>
            <p>Fichier du type: {file.fileExtension}</p>
            <FilePreview file={file} fileUrl={BASE_URL + 'file/stream/' + file.fileId} style={styles.filePreview} />
            <Button
                variant="contained"
                color="primary"
                onClick={async () => await downloadFile(file)}
                style={styles.downloadButton}
            >
                Télécharger
            </Button>
        </Paper>
    );
};

export default Details;
