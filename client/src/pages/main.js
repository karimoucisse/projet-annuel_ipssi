import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Card, CardContent, CardMedia, Typography, MenuItem, Button, Select, TextField } from "@mui/material";
import { fileService } from '../_services/file.service';
import { accountService } from "../_services/account.service";
import FileUpload from "../components/FileUploader";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import AbcIcon from '@mui/icons-material/Abc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import StorageIcon from '@mui/icons-material/Storage';
const Main = () => {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('date'); // Par défaut, tri par date
    const [filterType, setFilterType] = useState('');
    const [searchFileName, setSearchFileName] = useState('');
    const [sortDirection, setSortDirection] = useState("asc"); // Par défaut, tri ascendant


    const toggleSortDirection = () => {
        const newDirection = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(newDirection);
        console.log(newDirection);

        fetchData();
    };


    const BASE_URL = 'http://localhost:3000/';

    const fetchData = async () => {
        try {
            const fileResponse = await fileService.getAllFiles();

            // Trie les fichiers en fonction de l'option de tri
            const sortedFiles = fileResponse.data.slice().sort((a, b) => {
                const sortOrder = sortDirection === "asc" ? 1 : -1;

                if (sortBy === 'name') {
                    return sortOrder * a.name.localeCompare(b.name);
                } else if (sortBy === 'size') {
                    const fileSizeA = parseFloat(a.fileSize.$numberDecimal);
                    const fileSizeB = parseFloat(b.fileSize.$numberDecimal);
                    return sortOrder * (fileSizeA - fileSizeB);
                } else {
                    // Tri par date par défaut
                    return sortOrder * (new Date(a.createdAt) - new Date(b.createdAt));
                }
            });

            // Filtre les fichiers en fonction du format de fichier sélectionné
            const filteredFiles = sortedFiles.filter(file => {
                if (filterType) {
                    return file.fileExtension === filterType;
                }
                return true;
            });

            // Filtre les fichiers en fonction du nom de fichier recherché
            const searchedFiles = filteredFiles.filter(file => {
                if (searchFileName) {
                    const lowercaseFileName = file.name.toLowerCase();
                    const lowercaseSearchTerm = searchFileName.toLowerCase();
                    return lowercaseFileName.includes(lowercaseSearchTerm);
                }
                return true;
            });
            setFiles(searchedFiles);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [sortBy, filterType, searchFileName, sortDirection]);

    const onUploadFile = async (file) => {
        try {
            await fileService.uploadFile(file);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteFile = async (fileId) => {
        try {
            await fileService.deleteFile(fileId);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDetails = (fileId) => {
        navigate(`/details/${fileId}`);
    };
    // Fonction pour formater la date au format "JJ/MM/AAAA"
    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Notez que les mois commencent à 0
        const year = date.getFullYear();

        // Ajouter des zéros si nécessaire pour obtenir un format "JJ/MM/AAAA"
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    };
    const containerStyle = {
        // backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "10px",
        paddingInline: "100px",
        paddingBlock: "20px",
        marginBlock: "50px",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    };
    const searchBarStyle = {
        width: "80%",
        marginBottom: "10px"
    };
    const menuStyle = {
        width: "150px"
    }
    const btnStyle = {
        color: "#1C2930",
        backgroundColor: "#FADF8B",
        // width: 100,
    }
    const btnLogoutStyle = {
        color: "#FADF8B",
        backgroundColor: "#1C2930",
        // width: 100,
        display: "flex",
        marginLeft: "auto"
    }
    const boxContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        width: "100%",
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#f7f7f7',
        marginBottom: '20px',
    };
    return (
        <Container maxWidth="md" style={containerStyle}>

            <TextField
                label="Rechercher par nom de fichier"
                value={searchFileName}
                onChange={(e) => setSearchFileName(e.target.value)}
                style={searchBarStyle}
            />
            <FileUpload onUpload={onUploadFile} />
            <Typography variant="h4" gutterBottom>Fichiers</Typography>

            <Box style={boxContainerStyle}>
                <Typography onClick={toggleSortDirection}>
                    {sortDirection === 'asc' ? 'Trier par ordre croissant' : 'Trier par ordre décroissant'}{' '}
                </Typography>
                <span onClick={() => setSortBy('name')}>Nom</span>
                <span onClick={() => setSortBy('date')}>Date</span>
                <span onClick={() => setSortBy('size')}>Taille</span>
                <Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={menuStyle}
                >
                    <MenuItem value="">Tous les formats</MenuItem>
                    <MenuItem value="application/pdf">PDF</MenuItem>
                    <MenuItem value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">Docx</MenuItem>
                    <MenuItem value="image/jpeg">jpeg</MenuItem>
                </Select>
            </Box>


            <Grid container spacing={3}>
                {files.map(file => (
                    <Grid item xs={12} md={4} key={file._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={BASE_URL + 'file/stream/' + file.fileId}
                                alt={file.name}
                            />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>{file.name}</Typography>
                                <Typography variant="body2" color="textSecondary">Upload le {formatDateTime(file.createdAt)}</Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleDetails(file._id)}
                                    style={btnStyle}
                                >
                                    Détails
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => deleteFile(file._id)}
                                    style={btnLogoutStyle}
                                >
                                    Supprimer
                                </Button>

                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Main;
