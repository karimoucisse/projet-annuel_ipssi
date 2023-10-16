import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { accountService } from "../../_services/account.service";
import { userService } from "../../_services/user.service";

const Profile = () => {
    const navigate = useNavigate();
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isEditing, setEditing] = useState(false); // État pour activer/désactiver le mode d'édition
    const [userInfo, setUserInfo] = useState(null);
    const [editedUserInfo, setEditedUserInfo] = useState({});

    const deleteAccount = async () => { // TODO: AJOUTER FENETRE DE CONFIRMATION
        await userService.deleteUser()
            .then(res => {
                console.log(res);
                accountService.logout();
                navigate('/auth/login');
            })
            .catch(err => {
                console.log(err);
            });
    }

    const fetchUserInfo = async () => {
        try {
            const userId = accountService.getUserId();
            const response = await userService.getUserInfoById(userId);
            setUserInfo(response.data);
            // Préremplir les champs d'édition avec les informations actuelles
            setEditedUserInfo(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

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
        setEditing(!isEditing); // Activer/désactiver le mode d'édition
    };

    const handleSaveChanges = async () => {
        try {
            // Appel de la fonction pour mettre à jour les informations de l'utilisateur
            await userService.updateUser(editedUserInfo);
            setEditing(false); // Désactiver le mode d'édition après la sauvegarde
            fetchUserInfo(); // Mettre à jour les informations affichées après la sauvegarde
        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations de l'utilisateur:", error);
        }
    };

    const handleLogout = async () => {
        accountService.logout();
        navigate("/auth/login");
    };

    return (
        <Container maxWidth="md">
            <Box mt={2} p={2} bgcolor="#FADF8B">
                <Typography variant="h4" style={{ color: "#1C2930" }}>
                    Mon Profil
                </Typography>
            </Box>
            {userInfo !== null &&
                <Box mt={4}>
                    {isEditing ? (
                        <div>
                            <TextField
                                label="Email"
                                value={editedUserInfo.email}
                                onChange={(e) => setEditedUserInfo({ ...editedUserInfo, email: e.target.value })}
                            />
                            <TextField
                                label="Prénom"
                                value={editedUserInfo.firstname}
                                onChange={(e) => setEditedUserInfo({ ...editedUserInfo, firstname: e.target.value })}
                            />
                            <TextField
                                label="Nom de famille"
                                value={editedUserInfo.lastname}
                                onChange={(e) =>
                                    setEditedUserInfo({ ...editedUserInfo, lastname: e.target.value })
                                }
                            />
                            <TextField
                                label="Téléphone"
                                value={editedUserInfo.phone}
                                onChange={(e) =>
                                    setEditedUserInfo({ ...editedUserInfo, phone: e.target.value })
                                }
                            />
                            <TextField
                                label="Type de voie"
                                value={editedUserInfo.wayType}
                                onChange={(e) =>
                                    setEditedUserInfo({ ...editedUserInfo, wayType: e.target.value })
                                }
                            />
                            <TextField
                                label="Numéro"
                                value={editedUserInfo.number}
                                onChange={(e) =>
                                    setEditedUserInfo({ ...editedUserInfo, number: e.target.value })
                                }
                            />
                            <TextField
                                label="Nom de l'adresse"
                                value={editedUserInfo.addressName}
                                onChange={(e) =>
                                    setEditedUserInfo({
                                        ...editedUserInfo,
                                        addressName: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="Code postal"
                                value={editedUserInfo.postalCode}
                                onChange={(e) =>
                                    setEditedUserInfo({ ...editedUserInfo, postalCode: e.target.value })
                                }
                            />
                            <TextField
                                label="État"
                                value={editedUserInfo.state}
                                onChange={(e) =>
                                    setEditedUserInfo({ ...editedUserInfo, state: e.target.value })
                                }
                            />
                            <TextField
                                label="Ville"
                                value={editedUserInfo.city}
                                onChange={(e) =>
                                    setEditedUserInfo({ ...editedUserInfo, city: e.target.value })
                                }
                            />
                            <TextField
                                label="Pays"
                                value={editedUserInfo.country}
                                onChange={(e) =>
                                    setEditedUserInfo({ ...editedUserInfo, country: e.target.value })
                                }
                            />
                        </div>
                    ) : (
                        <div>
                            <Typography>Email: {userInfo.email}</Typography>
                            <Typography>Prénom: {userInfo.firstname}</Typography>
                            <Typography>Nom de famille: {userInfo.lastname}</Typography>
                            <Typography>Téléphone: {userInfo.phone}</Typography>
                            <Typography>Type de voie: {userInfo.wayType}</Typography>
                            <Typography>Numéro: {userInfo.number}</Typography>
                            <Typography>Nom de l'adresse: {userInfo.addressName}</Typography>
                            <Typography>Code postal: {userInfo.postalCode}</Typography>
                            <Typography>État: {userInfo.state}</Typography>
                            <Typography>Ville: {userInfo.city}</Typography>
                            <Typography>Pays: {userInfo.country}</Typography>
                        </div>
                    )}
                </Box>}
            <Box mt={4}>
                {isEditing ? (
                    <Button
                        variant="contained"
                        color="primary"
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
                    >
                        Modifier mon profil
                    </Button>
                )}
            </Box>
            <Box mt={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon style={{ color: "#1C2930" }} />}
                    onClick={handleDeleteClick}
                >
                    Supprimer mon compte
                </Button>
            </Box>
            <Box mt={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                >
                    Logout
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
