import React, { useEffect, useRef, useState } from "react";
import { Container, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, useTheme, Grid, Select, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { accountService } from "../../_services/account.service";
import { userService } from "../../_services/user.service";
import InvoiceList from './invoiceList'; // Assurez-vous que le chemin du fichier est correct

const Profile = () => {
    const navigate = useNavigate();
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [editedUserInfo, setEditedUserInfo] = useState({});
    const [invoices, setInvoices] = useState([]); // Ajoutez le state pour stocker les factures




    const fetchUserInfo = async () => {
        try {
            const userId = accountService.getUserId();
            const response = await userService.getUserInfoById(userId);
            setUserInfo(response.data);
            setEditedUserInfo(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);
    const containerRef = useRef(null);

    const fetchInvoices = async () => {
        try {
            const response = await accountService.getInvoice(); // Appel de la fonction pour récupérer les factures
            setInvoices(response.data); // Mettez à jour le state avec les factures récupérées
        } catch (error) {
            console.error("Erreur lors de la récupération des factures:", error);
        }
    };

    useEffect(() => {
        fetchInvoices(); // Appel de la fonction pour récupérer les factures lors du chargement de la page
    }, []);

    // désactiver le mode d'édition
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setEditing(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };
    const deleteAccount = async () => {
        await userService.deleteUser()
            .then(res => {
                console.log("user deleted", res);
                accountService.logout();
                navigate('/auth/login');
            })
            .catch(err => {
                console.log("user not deleted");
                console.log(err);
            });
    }
    const handleDeleteConfirm = async () => {
        try {
            deleteAccount()
        } catch (error) {
            console.error("Erreur lors de la suppression du compte:", error);
        } finally {
            setDeleteDialogOpen(false);
        }
    };
    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const handleToggleEdit = () => {
        setEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await userService.updateUser(editedUserInfo);
            setEditing(false);
            fetchUserInfo();
        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations de l'utilisateur:", error);
        }
    };

    const handleLogout = async () => {
        accountService.logout();
        navigate("/auth/login");
    };

    const containerStyle = {
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "10px",
        padding: "16px",
        marginBlock: 50
    };
    const titleStyle = {
        color: "#1C2930",
        textAlign: "center",
        fontWeight: "bold",
        borderBottom: "solid 4px #FADF8B",
        width: 200,
        marginInline: "auto"
    };
    const btnStyle = {
        color: "#1C2930",
        backgroundColor: "#FADF8B",
        width: 250
    }
    const btnSaveStyle = {
        width: 250
    }
    const btnLogoutStyle = {
        color: "#FADF8B",
        backgroundColor: "#1C2930",
        width: 250,
        display: "flex",
        marginLeft: "auto"
    }
    // const theme = useTheme();

    const userInfoStyle = {
        // backgroundColor: "#1C2930", // Couleur de fond #FADF8B
        // color: "rgba(255, 255, 255, 0.8)", // Couleur du texte #1C2930
        color: "#1C2930", // Couleur du texte #1C2930
        padding: "8px",
        // borderRadius: "10px",
    };
    const infoStyle = {
        marginBottom: "12px", // Marge inférieure entre les éléments
        borderBottom: `1px solid #FADF8B`, // Trait de séparation
    }

    const textFieldStyle = {
        marginBottom: "10px"
    };

    const typographyStyle = {
        marginBottom: "20px",
        textAlign: "center"
    };

    return (
        <Container maxWidth="md" style={containerStyle} ref={containerRef}>
            <InvoiceList />
            <Box mt={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    style={btnLogoutStyle}
                    startIcon={<LogoutIcon />}
                >
                    Se déconnecter
                </Button>
            </Box>
            <Box mt={2} p={2} >
                <Typography variant="h4" style={titleStyle}>
                    Mon Profil
                </Typography>
            </Box>
            {userInfo !== null &&
                <Box mt={4}>
                    {isEditing ? (
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h6" style={typographyStyle}>Information Personnelle</Typography>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={editedUserInfo.email}
                                        onChange={handleChange}
                                        fullWidth
                                        style={textFieldStyle}
                                    />
                                    <TextField
                                        label="Prénom"
                                        name="firstname"
                                        value={editedUserInfo.firstname}
                                        onChange={handleChange}
                                        fullWidth
                                        style={textFieldStyle}
                                    />
                                    <TextField
                                        label="Nom de famille"
                                        name="lastname"
                                        value={editedUserInfo.lastname}
                                        onChange={handleChange}
                                        fullWidth
                                        style={textFieldStyle}
                                    />
                                    <TextField
                                        label="Téléphone"
                                        name="phone"
                                        value={editedUserInfo.phone}
                                        onChange={handleChange}
                                        fullWidth
                                        style={textFieldStyle}
                                    />
                                    <Select
                                        label="Type de voie"
                                        name="wayType"
                                        value={editedUserInfo.wayType}
                                        onChange={handleChange}
                                        fullWidth
                                        style={textFieldStyle}
                                    >
                                        <MenuItem value={""}>Selectionner un type de voie</MenuItem>
                                        <MenuItem value={1}>Rue</MenuItem>
                                        <MenuItem value={2}>Avenue</MenuItem>
                                        <MenuItem value={3}>Boulevard</MenuItem>
                                    </Select>
                                    <TextField
                                        label="Numéro"
                                        name="number"
                                        value={editedUserInfo.number}
                                        onChange={handleChange}
                                        fullWidth
                                        style={textFieldStyle}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" style={typographyStyle}>Adresse</Typography>
                                    <TextField
                                        label="Nom de l'adresse"
                                        name="addressName"
                                        value={editedUserInfo.addressName}
                                        onChange={handleChange}
                                        fullWidth
                                        style={textFieldStyle}
                                    />
                                    <TextField
                                        label="Code postal"
                                        name="postalCode"
                                        value={editedUserInfo.postalCode}
                                        onChange={handleChange}
                                        fullWidth
                                        style={textFieldStyle}
                                    />
                                    <TextField
                                        label="État"
                                        name="state"
                                        value={editedUserInfo.state}
                                        onChange={handleChange}
                                        fullWidth
                                        style={textFieldStyle}
                                    />
                                    <TextField
                                        label="Ville"
                                        name="city"
                                        value={editedUserInfo.city}
                                        onChange={handleChange}
                                        fullWidth
                                        style={textFieldStyle}
                                    />
                                    <TextField
                                        label="Pays"
                                        name="country"
                                        value={editedUserInfo.country}
                                        onChange={handleChange}
                                        fullWidth
                                        style={textFieldStyle}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    ) : (
                        <div style={userInfoStyle}>
                            <Typography style={infoStyle}>Email: {userInfo.email}</Typography>
                            <Typography style={infoStyle}>Prénom: {userInfo.firstname}</Typography>
                            <Typography style={infoStyle}>Nom de famille: {userInfo.lastname}</Typography>
                            <Typography style={infoStyle}>Téléphone: {userInfo.phone}</Typography>
                            <Typography style={infoStyle}>Type de voie: {userInfo.wayType}</Typography>
                            <Typography style={infoStyle}>Numéro: {userInfo.number}</Typography>
                            <Typography style={infoStyle}>Nom de l'adresse: {userInfo.addressName}</Typography>
                            <Typography style={infoStyle}>Code postal: {userInfo.postalCode}</Typography>
                            <Typography style={infoStyle}>État: {userInfo.state}</Typography>
                            <Typography style={infoStyle}>Ville: {userInfo.city}</Typography>
                            <Typography style={infoStyle}>Pays: {userInfo.country}</Typography>
                        </div>
                    )}
                </Box>}
            <Box mt={4} display="flex" justifyContent="space-around">
                {isEditing ? (
                    <Button
                        variant="contained"
                        color="primary"
                        style={btnSaveStyle}
                        startIcon={<SaveIcon />}
                        onClick={handleSaveChanges}
                    >
                        Sauvegarder
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<EditIcon style={{ color: "#1C2930" }} />}
                        onClick={handleToggleEdit}
                        style={btnStyle}
                    >
                        Modifier mon profil
                    </Button>
                )}

                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon style={{ color: "#1C2930" }} />}
                    onClick={handleDeleteClick}
                    style={btnStyle}
                >
                    Supprimer mon compte
                </Button>
            </Box>

            <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirmation de suppression</DialogTitle>
                <DialogContent>
                    Êtes-vous sûr de vouloir supprimer votre compte ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirm} color="primary">
                        Confirmer
                    </Button>
                    <Button onClick={handleDeleteCancel} color="secondary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Profile;
