import { useEffect, useState } from 'react';
import api from '../../api';

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
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userSlice';
const SignupStep1 = ({ setStep }) => {
  const theme = useTheme();
  // const { userInfo } = useSelector((select) => select.profile);
  const dispatch = useDispatch();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
  };

  const [errorMessage, setErrorMessage] = useState(undefined);

  const API_URL = 'http://localhost:5000';

  const handleSubmit = (values) => {
    const userInfo = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    dispatch(updateUser(userInfo));
    // console.log(values);
    setStep(2);
  };

  const handleError = (errorDescription) => {
    // Display an error message to the user.
    setErrorMessage(errorDescription);
  };

  return (
    <Box height="100vh">
      <Stack direction="row" display="flex" height="100vh">
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
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
                firstName: Yup.string()
                  .required('Prénom requis')
                  .min(2, 'Prénom incorrect'),
                lastName: Yup.string()
                  .required('Nom requis')
                  .min(2, 'Nom incorrect'),
                email: Yup.string()
                  .required('Email requis')
                  .email("E-email invalide'"),
                password: Yup.string().required('Mot de passe requis'),
                rePassword: Yup.string().required('Mot de passe requis'),
              })}
            >
              {({ errors, isValid, touched, dirty }) => (
                <Form>
                  <Stack direction="row" sx={{ mb: 2 }} spacing={3}>
                    <Field
                      as={TextField}
                      id="firstName"
                      name="firstName"
                      size="medium"
                      label="Prénom"
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                      variant="filled"
                    />
                    <Field
                      as={TextField}
                      id="lastName"
                      name="lastName"
                      size="medium"
                      label="Nom"
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      variant="filled"
                    />
                  </Stack>
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
                    // onClick={() => setStep(2)}
                  >
                    Suivant
                  </Button>
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
          backgroundColor={theme.palette.primary.main}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            gap: 3,
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
