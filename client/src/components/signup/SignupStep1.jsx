import { useEffect, useState } from 'react';
import api from "../../api"

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
const SignupStep1 = ({ setStep }) => {
  const [userCreated, setUserCreated] = useState(false);
  const initialValues = {
    firstname: '',
    lastname: '',
    mail: '',
    password: '',
    rePassword: '',
  };

  const [errorMessage, setErrorMessage] = useState(undefined);

  const API_URL = "http://localhost:5000"

  const handleSubmit = (values) => {
    const requestBody = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.mail,
      password: values.password,
    };

    const url = `${API_URL}/auth/signup`;

    api().post(url, requestBody)
      .then((response) => {
        // Redirect the user to the login page after successful signup.
        // Met à jour l'état UserCreated
        setUserCreated(true);
        console.log(response)
        console.log(requestBody)
      })
      .catch((error) => {
        // Handle the error.
        const errorDescription = error.message;
        handleError(errorDescription);
        console.log(JSON.stringify(requestBody))
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
              onSubmit={(values, formikHelpers) => {
                handleSubmit(values);
                // formikHelpers.resetForm()  // reset the form after onSubmit
              }}
              validationSchema={Yup.object({
                firstname: Yup.string()
                  .required('Prénom requis')
                  .min(2, 'Prénom incorrect'),
                lastname: Yup.string()
                  .required('Nom requis')
                  .min(2, 'Nom incorrect'),
                mail: Yup.string()
                  .required('Email requis')
                  .email("E-mail invalide'"),
                password: Yup.string().required('Mot de passe requis'),
                rePassword: Yup.string().required('Mot de passe requis'),
              })}
            >
              {({ errors, isValid, touched, dirty }) => (
                <Form>
                  <Stack direction="row" sx={{ mb: 2 }} spacing={3}>
                    <Field
                      as={TextField}
                      id="firstname"
                      name="firstname"
                      size="medium"
                      label="Prénom"
                      error={touched.firstname && Boolean(errors.firstname)}
                      helperText={touched.firstname && errors.firstname}
                      variant="filled"
                    />
                    <Field
                      as={TextField}
                      id="lastname"
                      name="lastname"
                      size="medium"
                      label="Nom"
                      error={touched.lastname && Boolean(errors.lastname)}
                      helperText={touched.lastname && errors.lastname}
                      variant="filled"
                    />
                  </Stack>
                  <Field
                    as={TextField}
                    id="email"
                    name="mail"
                    size="medium"
                    label="E-mail"
                    error={touched.mail && Boolean(errors.mail)}
                    helperText={touched.mail && errors.mail}
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
                    sx={{ mb: 2, width: '100%' }}
                    variant="filled"
                  />
                  <Field
                    as={TextField}
                    id="rePassword"
                    name="rePassword"
                    size="medium"
                    type="password"
                    label="Confirmer votre mot de passe"
                    error={touched.rePassword && Boolean(errors.rePassword)}
                    helperText={touched.rePassword && errors.rePassword}
                    sx={{ width: '100%' }}
                    variant="filled"
                  />
                  <Typography my={2} variant="body2">
                    Vous avez déjà un compte ?
                    <Link href="/signin" color="inherit" ml={1}>
                      Se connecter
                    </Link>
                  </Typography>
                  {userCreated ? (
                    <Link to="/signin">
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
                        Suivant
                      </Button>
                    </Link>
                  ) : (
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
                      Suivant
                    </Button>
                  )}
                </Form>
              )}
            </Formik>
            <Stack
              mt={2}
              spacing={2}
              sx={{
                width: '100%',
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  color: 'black',
                }}
              >
                <GoogleIcon sx={{ marginRight: 4 }} />
                Connexion avec Google
              </Button>
              <Button
                variant="outlined"
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  color: 'black',
                }}
              >
                <FacebookOutlinedIcon sx={{ marginRight: 4 }} />
                Connexion avec Facebook
              </Button>
            </Stack>
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
};

export default SignupStep1;
