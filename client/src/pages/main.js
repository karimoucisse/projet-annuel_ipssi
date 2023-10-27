import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, MenuItem, Button, Select, TextField, Box } from "@mui/material";
import { fileService } from '../_services/file.service';
import FileUpload from "../components/FileUploader";
import { useNavigate } from "react-router-dom";
import AbcIcon from '@mui/icons-material/Abc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StorageIcon from '@mui/icons-material/Storage';
import { accountService } from "../_services/account.service";

const Main = () => {
    const [files, setFiles] = useState([]);
    const [displayedFiles, setDisplayedFiles] = useState(6); // Nombre de cartes affichées
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('date');
    const [filterType, setFilterType] = useState('');
    const [searchFileName, setSearchFileName] = useState('');
    const [sortDirection, setSortDirection] = useState("asc");
    const [userStorage, setUserStorage] = useState(0); // Stockage de l'utilisateur


    const toggleSortDirection = () => {
        const newDirection = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(newDirection);
        fetchData();
    };

    const BASE_URL = 'http://localhost:3000/'; // TODO: METTRE DANS .ENV
    const fetchUserStorage = async () => {
        try {
            const response = await accountService.getStorage();
            const totalStorage = response.data.storage[0].totalStorage;
            const usedStorage = response.data.storage[0].usedStorage;
            const remainingStorage = totalStorage - usedStorage;
            setUserStorage(remainingStorage);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchData = async () => {
        try {
            const fileResponse = await fileService.getAllFiles();
            const sortedFiles = fileResponse.data.slice().sort((a, b) => {
                const sortOrder = sortDirection === "asc" ? 1 : -1;

                if (sortBy === 'name') {
                    return sortOrder * a.name.localeCompare(b.name);
                } else if (sortBy === 'size') {
                    const fileSizeA = parseFloat(a.fileSize.$numberDecimal);
                    const fileSizeB = parseFloat(b.fileSize.$numberDecimal);
                    return sortOrder * (fileSizeA - fileSizeB);
                } else {
                    return sortOrder * (new Date(a.createdAt) - new Date(b.createdAt));
                }
            });

            const filteredFiles = sortedFiles.filter(file => {
                if (filterType) {
                    return file.fileExtension === filterType;
                }
                return true;
            });

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
        fetchUserStorage();
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

    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    };

    const homeContainerStyle = {
        marginBlock: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "90vw"
    };

    const containerStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "10px",
        paddingInline: "100px",
        paddingBlock: "20px",
        marginBlock: "50px",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "90%"
    };

    const searchBarStyle = {
        width: "80%",
        marginBottom: "10px"
    };

    const menuStyle = {
        width: "150px"
    };

    const spanStyle = {
        display: "flex",
        alignItems: "center",
        cursor: "pointer"
    };

    const btnStyle = {
        color: "#1C2930",
        backgroundColor: "#FADF8B",
    };

    const btnLogoutStyle = {
        color: "#FADF8B",
        backgroundColor: "#1C2930",
        display: "flex",
        marginLeft: "auto"
    };

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
        <Container maxWidth="90vw" style={homeContainerStyle}>
            <Typography variant="h6" gutterBottom>
                Espace de stockage restant : {userStorage} Mo
            </Typography>
            <TextField
                label="Rechercher par nom de fichier"
                value={searchFileName}
                onChange={(e) => setSearchFileName(e.target.value)}
                style={searchBarStyle}
            />
            <FileUpload onUpload={onUploadFile} />
            <Container style={containerStyle}>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                    <Typography variant="h4" gutterBottom>Fichiers</Typography>
                    <Box style={boxContainerStyle}>
                        <Typography onClick={toggleSortDirection}>
                            {sortDirection === 'asc' ? 'Trier par ordre croissant' : 'Trier par ordre décroissant'}{' '}
                        </Typography>
                        <span style={spanStyle} onClick={() => setSortBy('name')}><AbcIcon /> Nom</span>
                        <span style={spanStyle} onClick={() => setSortBy('date')}><CalendarMonthIcon /> Date</span>
                        <span style={spanStyle} onClick={() => setSortBy('size')}><StorageIcon /> Taille</span>

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
                </Box>
                <Grid container spacing={3}>
                    {files.slice(0, displayedFiles).map(file => (
                        <Grid item xs={12} md={4} key={file._id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={BASE_URL + 'file/stream/' + file.fileId}
                                    alt={file.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" gutterBottom style={{ height: '4rem', overflow: 'hidden' }}>
                                        {file.name}
                                    </Typography>
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
                {displayedFiles < files.length && (
                    <Box display="flex" justifyContent="center" margin="20px">
                        <Button onClick={() => setDisplayedFiles(displayedFiles + 6)}>Voir plus</Button>
                    </Box>
                )}
            </Container>
        </Container>
    );
};

export default Main;
