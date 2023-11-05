import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, MenuItem, Button, Select, TextField, Box, LinearProgress } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { fileService } from '../_services/file.service';
import FileUpload from "../components/FileUploader";
import { useNavigate } from "react-router-dom";
import AbcIcon from '@mui/icons-material/Abc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StorageIcon from '@mui/icons-material/Storage';
import { accountService } from "../_services/account.service";


const Main = () => {
    const [files, setFiles] = useState([]);
    const [displayedFiles, setDisplayedFiles] = useState(6);
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('date');
    const [filterType, setFilterType] = useState('');
    const [searchFileName, setSearchFileName] = useState('');
    const [sortDirection, setSortDirection] = useState("asc");
    const [totalStorage, setTotalStorage] = useState(0);
    const [usedStorage, setUsedStorage] = useState(0);
    const [upload, setUpload] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null); // Pour stocker le fichier à supprimer

    const openDeleteDialog = (file) => {
        setFileToDelete(file);
        setDeleteDialogOpen(true);
    };
    const closeDeleteDialog = () => {
        setFileToDelete(null);
        setDeleteDialogOpen(false);
    };
    const toggleSortDirection = () => {
        const newDirection = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(newDirection);
        fetchData();
    };

    const BASE_URL = 'http://localhost:3000/'; // TODO: METTRE DANS .ENV
    const addStorage = async () => {
        // await accountService.addStorage({ subscription: "1" })
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => console.log(err));

        await accountService.payment({ subscription: "1", userId: accountService.getUserId() }) // L'utilisateur passe au paiement
            .then(res => {
                console.log(res);
                if (res.data.url) {
                    window.location.href = res.data.url;
                }
            })
            .catch(err => console.log(err));
    }

    const fetchUserStorage = async () => {
        try {
            const response = await accountService.getStorage();
            const totalStorage = response.data.sum * 2048;
            console.log(totalStorage)
            // const remainingStorage = totalStorage - usedStorage;
            setTotalStorage(totalStorage);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchData = async () => {
        try {
            const fileResponse = await fileService.getAllFiles();

            // Utilisez reduce pour calculer la somme des tailles de fichiers
            const totalSizeInBytes = fileResponse.data.reduce((accumulator, file) => {
                const fileSizeInBytes = parseFloat(file.fileSize.$numberDecimal);
                return accumulator + fileSizeInBytes;
            }, 0);

            // Convertir la somme en Mo (1 Mo = 1024 Ko = 1024 * 1024 octets)
            const totalSizeInMegabytes = (totalSizeInBytes / (1024 * 1024)).toFixed(2);

            // Mettez à jour le state usedStorage avec la somme en Mo
            setUsedStorage(totalSizeInMegabytes);
            console.log(totalSizeInMegabytes)
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
            console.log("up 1 => ", upload);
            await fileService.uploadFile(file);
            setUpload(true);
            await fetchData();
            setUpload(false)
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteFile = async (file) => {
        try {
            await fileService.deleteFile(file._id);
            fetchData();
            closeDeleteDialog();
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
        marginBottom: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "10px",
        backdropFilter: "blur(10px)",

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
        // width: "100%",
        alignItems: 'center',
        border: '1px solid #ccc',
        // padding: '10px',
        borderRadius: '5px',
        // backgroundColor: '#f7f7f7',
        marginBottom: '20px',
        width: "70%"
    };
    const borderLinearProgressStyle = {
        height: "8px",
        borderRadius: "5px",
        backgroundColor: "lightgray",
    };
    return (
        <Container maxWidth="90vw" style={homeContainerStyle}>
            <Box
                width="60%"
                padding="20px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                border="1px solid black"
                backgroundColor="rgba(255, 255, 255, 0.9)"
                borderRadius="5px"
                backdropFilter="blur(10px)"
                marginBottom='20px'
            >
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Box width={"250px"} display="flex" alignItems="center">
                        <StorageIcon fontSize={"small"} />
                        <Typography display="flex" alignItems="center" paddingLeft={"5px"} paddingTop={"5px"} fontWeight={"bold"} fontSize={"12px"} variant="body1" gutterBottom>
                            Espace de stockage : {usedStorage}/{totalStorage} Mo
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={(usedStorage / totalStorage) * 100}
                        style={{ width: "250px", ...borderLinearProgressStyle }}
                    />
                </Box>
                <Button onClick={addStorage} variant="contained" style={btnStyle}>
                    Ajouter du stockage
                </Button>
            </Box>
            <TextField
                label="Rechercher par nom de fichier"
                value={searchFileName}
                onChange={(e) => setSearchFileName(e.target.value)}
                style={searchBarStyle}
            />
            <FileUpload onUpload={onUploadFile} onUploadProgress={upload} />

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
                            <MenuItem value="application/pdf">pdf</MenuItem>
                            <MenuItem value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">Docx</MenuItem>
                            <MenuItem value="image/jpeg">jpeg</MenuItem>
                            <MenuItem value="image/png">png</MenuItem>
                            <MenuItem value="image/gif">gif</MenuItem>
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
                                        onClick={() => openDeleteDialog(file)}
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
            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Confirmation de suppression</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Êtes-vous sûr de vouloir supprimer le fichier "{fileToDelete?.name}" ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => handleDeleteFile(fileToDelete)} color="primary">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>

        </Container >
    );
};

export default Main;
