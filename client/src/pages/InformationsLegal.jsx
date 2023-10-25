import React from 'react';
import {
    Container,
    Typography,
    List,
    ListItemText,
    Divider,
    useTheme,
    ListItemButton,
} from '@mui/material';

const LegalInformation = () => {
    const theme = useTheme();
    const containerStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "10px",
        padding: "16px",
        marginBlock: "50px",
        backdropFilter: "blur(10px)",
    };
    return (
        <Container maxWidth="md" style={containerStyle}>
            <Typography variant="h4" style={{ marginBottom: theme.spacing(2) }}>
                Informations légales
            </Typography>

            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <Typography variant="h5">Sommaire</Typography>
                    <List>
                        < ListItemButton component="a" href="#mentions-legales">
                            <ListItemText primary="I. Mentions Légales" />
                        </ ListItemButton>
                        <ListItemButton component="a" href="#politique-confidentialite">
                            <ListItemText primary="II. Politique de confidentialité" />
                        </ListItemButton>
                        <ListItemButton component="a" href="#conditions-utilisation">
                            <ListItemText primary="III. Conditions d'utilisation" />
                        </ListItemButton>
                    </List>
                </div>
                <Divider orientation="vertical" flexItem />
                <div style={{ flex: 3 }}>
                    <section id="mentions-legales">
                        <Typography variant="h5" style={{ marginBottom: theme.spacing(2) }}>
                            I. Mentions Légales
                        </Typography>
                        <p>
                            <strong>1. Raison sociale :</strong> ArchiConnect
                            <br />
                            <strong>2. Siège social :</strong> Paris, France
                            <br />
                            <strong>3. Téléphone :</strong> +33 1 23 45 67 89
                            <br />
                            <strong>4. E-mail :</strong> contact@archiconnect.fr
                            <br />
                            <strong>5. SIRET :</strong> 12345678900001
                        </p>
                        <p>
                            ArchiConnect est une entreprise fictive spécialisée dans le
                            stockage sécurisé de fichiers pour les cabinets d'architectes.
                            Cette plateforme a été créée dans le but de répondre aux besoins de
                            stockage de documents numériques et d'offrir un accès facile aux
                            clients du cabinet.
                        </p>

                        <p>
                            <strong>6. Responsable de la publication :</strong> John Doe
                            <br />
                            <strong>7. Hébergement :</strong> ArchiConnect est hébergé sur des serveurs
                            sécurisés garantissant la protection des données de nos clients.
                        </p>
                        <p>
                            <strong>8. Propriété intellectuelle :</strong> Tous les contenus présents sur
                            le site de ArchiConnect, y compris, mais sans s'y limiter, les images, les
                            textes, les logos, les documents, et les données, sont la propriété
                            exclusive de ArchiConnect. Toute utilisation non autorisée de ces contenus
                            est strictement interdite.
                        </p>
                        <p>
                            <strong>9. Utilisation des cookies :</strong> Notre site web utilise des
                            cookies pour améliorer l'expérience de nos utilisateurs. En naviguant sur
                            notre site, vous acceptez l'utilisation de cookies conformément à notre
                            politique de confidentialité.
                        </p>
                        <p>
                            <strong>10. Loi applicable :</strong> Les présentes mentions légales sont
                            régies par le droit français. Tout litige en relation avec l'utilisation du
                            site sera soumis à la compétence exclusive des tribunaux français.
                        </p>
                    </section>

                    <section id="politique-confidentialite">
                        <Typography variant="h5" style={{ marginBottom: theme.spacing(2) }}>
                            II. Politique de Confidentialité
                        </Typography>
                        <p>
                            <strong>1. Collecte d'informations :</strong> ArchiConnect collecte des
                            informations personnelles lors de l'inscription des utilisateurs, y compris
                            leur nom, prénom, adresse e-mail, adresse postale, numéro de téléphone, et
                            d'autres informations nécessaires à la fourniture de nos services.
                        </p>
                        <p>
                            <strong>2. Utilisation des informations :</strong> Les informations
                            collectées sont utilisées pour permettre aux utilisateurs d'accéder à
                            leur espace de stockage, de gérer leurs fichiers, d'effectuer des achats
                            d'espace supplémentaire, et de recevoir des factures. ArchiConnect s'engage
                            à ne pas divulguer les informations personnelles à des tiers, sauf
                            conformément à la loi.
                        </p>
                        <p>
                            <strong>3. Sécurité des données :</strong> ArchiConnect prend la sécurité
                            des données de ses utilisateurs très au sérieux. Toutes les données sont
                            stockées sur des serveurs sécurisés. Nous mettons en place des mesures de
                            sécurité appropriées pour protéger les informations de nos clients.
                        </p>
                        <p>
                            <strong>4. Accès aux données :</strong> Les utilisateurs peuvent accéder à
                            leurs données personnelles, les mettre à jour, ou les supprimer en
                            contactant notre service client. Les factures sont également accessibles
                            via le compte client.
                        </p>
                        <p>
                            <strong>5. Cookies :</strong> Notre site web utilise des cookies pour
                            améliorer l'expérience des utilisateurs. En naviguant sur notre site, vous
                            acceptez l'utilisation de cookies conformément à notre politique de
                            confidentialité.
                        </p>
                        <p>
                            <strong>6. Modification de la politique de confidentialité :</strong> ArchiConnect
                            se réserve le droit de modifier sa politique de confidentialité en
                            fonction des besoins de l'entreprise et des exigences légales. Les
                            utilisateurs seront informés de tout changement.
                        </p>
                        <p>
                            <strong>7. Contact :</strong> Pour toute question concernant notre politique
                            de confidentialité, veuillez nous contacter à l'adresse suivante :
                            contact@archiconnect.fr.
                        </p>
                    </section>


                    <section id="conditions-utilisation">
                        <Typography variant="h5" style={{ marginBottom: theme.spacing(2) }}>
                            III. Conditions d'Utilisation
                        </Typography>
                        <p>
                            <strong>1. Acceptation des conditions :</strong> En utilisant les services
                            d'ArchiConnect, les utilisateurs acceptent automatiquement les présentes
                            conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez
                            ne pas utiliser nos services.
                        </p>
                        <p>
                            <strong>2. Utilisation autorisée :</strong> Les utilisateurs sont autorisés
                            à utiliser les services d'ArchiConnect conformément à ces conditions
                            d'utilisation. Cela comprend l'inscription, l'accès à l'espace de stockage,
                            la gestion de fichiers, les achats d'espace supplémentaire, etc.
                        </p>
                        <p>
                            <strong>3. Restrictions d'utilisation :</strong> Les utilisateurs ne sont pas
                            autorisés à utiliser nos services de manière abusive ou illégale. Cela
                            inclut la violation des droits d'auteur, la diffusion de contenu
                            inapproprié, la tentative de piratage, etc.
                        </p>
                        <p>
                            <strong>4. Frais et paiement :</strong> Les utilisateurs sont tenus de payer
                            les frais associés à l'achat initial d'espace de stockage et à tout espace
                            supplémentaire acheté. Les paiements doivent être effectués conformément à
                            nos politiques de facturation.
                        </p>
                        <p>
                            <strong>5. Résiliation du compte :</strong> ArchiConnect se réserve le droit
                            de résilier le compte de tout utilisateur en cas de violation de ces
                            conditions d'utilisation.
                        </p>
                        <p>
                            <strong>6. Modifications des services :</strong> ArchiConnect peut modifier
                            ou interrompre ses services à tout moment. Les utilisateurs en seront
                            informés en cas de modifications majeures.
                        </p>
                        <p>
                            <strong>7. Responsabilité :</strong> ArchiConnect n'est pas responsable de
                            la perte de données des utilisateurs ou des dommages résultant de
                            l'utilisation de nos services. Les utilisateurs sont responsables de la
                            sauvegarde de leurs propres données.
                        </p>
                        <p>
                            <strong>8. Contact :</strong> Pour toute question concernant nos conditions
                            d'utilisation, veuillez nous contacter à l'adresse suivante :
                            contact@archiconnect.fr.
                        </p>
                    </section>

                </div>
            </div>
        </Container>
    );
};

export default LegalInformation;
