import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../../_services/account.service';

// @mui
import {
    Box,
    Stack,
    TextField,
    Button,
    Typography,
    Link,
} from '@mui/material';
// formik
import { Formik, Form, Field } from 'formik';
// yup
import * as Yup from 'yup';
// mui icons
import ArchiConnectContainer from './ArchiConnectContainer';

const Login = () => {
    const navigate = useNavigate();

    const credentials = {
        email: '',
        password: '',
    };

    const [errorMessage, setErrorMessage] = useState(undefined);

    const onSubmit = (credentials) => {
        console.log(credentials);
        accountService.login(credentials)
            .then(res => {
                console.log(res);
                if (res.data.isActive) {
                    accountService.saveToken(res.data.token);
                    accountService.saveUserId(res.data.userId);
                } if (!res.data.isActive) {
                    accountService.saveUserId(res.data.userId);
                    navigate('/auth/signup');
                } else {
                    navigate('/');
                }

            })
            .catch(err => console.log(err));
    }



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
                    sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                    <Stack width="50vw">
                        <Formik
                            initialValues={credentials}
                            onSubmit={(values) => {
                                onSubmit(values);
                            }
                            }
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
                <ArchiConnectContainer />
            </Stack>
        </Box>
    );
}

export default Login;