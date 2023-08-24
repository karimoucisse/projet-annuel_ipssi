import { useEffect, useState } from 'react';
import api from "../api"

// @mui
import {
    Box,
    Stack,
    TextField,
    Button,
    Fade,
    InputAdornment,
    useTheme,
    Typography,
    Checkbox,
    Link,
    LinearProgress,
    CircularProgress,
    Container,
    Avatar,
} from '@mui/material';
// formik
import { Formik, Form, Field } from 'formik';
// yup
import * as Yup from 'yup';
// mui icons
import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';

const Login = () => {
    const initialValues = {
        email: '',
        password: '',
    };

    const [errorMessage, setErrorMessage] = useState(undefined);

    const API_URL = "http://localhost:5000"

    const handleSubmit = (values) => {
        const requestBody = {
            email: values.email,
            password: values.password,
        };

        const url = `${API_URL}/auth/login`;

        api().post(url, requestBody)
            .then((response) => {
                // Redirect the user to the home page after successful login.
                console.log(response)
                window.location.href = '/';
            })
            .catch((error) => {
                // Handle the error.
                const errorDescription = error.message;
                setErrorMessage(errorDescription);
                console.log(JSON.stringify(requestBody));
            });
    };


    const handleError = (errorDescription) => {
        // Display an error message to the user.
        setErrorMessage(errorDescription);
    };

    return (
        <Box>
            <Stack direction="row" display="flex" height="100vh">
                <Box
                    display="flex"
                    flexDirection="column"
                    flex={0.8}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ backgroundColor: '#FAF9F8' }}
                >
                    <Stack width="400px">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => {
                                handleSubmit(values);
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .required('Email requis')
                                    .email("E-mail invalide'"),
                                password: Yup.string().required('Mot de passe requis'),
                            })}
                        >
                            {({ errors, isValid, touched, dirty }) => (
                                <Form>
                                    <Stack direction="row" sx={{ mb: 2 }} spacing={3}>
                                        <Field
                                            as={TextField}
                                            id="email"
                                            name="email"
                                            size="medium"
                                            label="E-mail"
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            sx={{ mb: 2, width: '100%' }}
                                            variant="filled"
                                        />
                                        <Field
                                            as={TextField}
                                            id="password"
                                            name="password"
                                            size="medium"
                                            type="password"
                                            label="Mot de pass"
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            sx={{ width: '100%' }}
                                            variant="filled"
                                        />
                                    </Stack>
                                    <Typography my={2} variant="body2">
                                        Mot de passe oublié ?
                                        <Link href="/forgot-password" color="inherit" ml={1}>
                                            Réinitialiser
                                        </Link>
                                    </Typography>
                                    <Button
                                        type="submit"
                                        disabled={!isValid}
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        sx={{
                                            width: '100%',
                                            my: 2,
                                        }}
                                    >
                                        Se connecter
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                </Box>
                <Box
                    flex={0.9}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4,
                        gap: 3,
                        backgroundColor: '#1c2930',
                        color: 'white',
                        // position: 'relative',
                    }}
                >
                    <Typography variant="h2" textAlign="center" width="100%">
                        ArchiConnect
                    </Typography>
                    <Typography variant="subtitle1">
                        Conservez vos fichiers en toute sécurité, prêts à <br /> être
                        consultés et partagés à tout moment.
                    </Typography>
                    {/* <Box
                     sx={{ position: 'absolute', bottom: '40px', right: '-50px' }}
                     >
                     <Avatar
                       variant="square"
                       alt="Architecture"
                       src="/assets/architecture.jpg"
                       sx={{ width: '400px', height: '400px' }}
                     />
                    </Box> */}
                </Box>
            </Stack>
        </Box>
    );
}

export default Login;