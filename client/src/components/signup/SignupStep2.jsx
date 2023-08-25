import { useEffect, useState } from 'react';
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

const SignupStep2 = ({ setStep }) => {
  const initialValues = {
    country: '',
    region: '',
    name: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box
      height="100%"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Stack width="400px" mt={6}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            handleSubmit(values);
            // formikHelpers.resetForm()  // reset the form after onSubmit
          }}
          validationSchema={Yup.object({
            country: Yup.string().required('Pays requis'),
            region: Yup.string().required('Region requise'),
            name: Yup.string().required(
              'Nom complet (prénom et nom de famille) requis',
            ),
            phone: Yup.string().required('Numero de téléphone requis'),
            address: Yup.string().required('adresse requise'),
            postalCode: Yup.string().required('code postale requis'),
            city: Yup.string().required('ville requis'),
          })}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form>
              <Stack direction="row" sx={{ mb: 2 }} spacing={3}>
                <Field
                  as={TextField}
                  id="country"
                  name="country"
                  size="medium"
                  label="Pays"
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                  variant="filled"
                />
                <Field
                  as={TextField}
                  id="region"
                  name="region"
                  size="medium"
                  label="Region"
                  error={touched.region && Boolean(errors.region)}
                  helperText={touched.region && errors.region}
                  variant="filled"
                />
              </Stack>
              <Field
                as={TextField}
                id="name"
                name="name"
                size="medium"
                label="Nom complet (prénom et nom de famille)"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{ mb: 2, width: '100%' }}
                variant="filled"
              />
              <Field
                as={TextField}
                id="phone"
                name="phone"
                size="medium"
                label="Numéro de téléphone"
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                sx={{ mb: 2, width: '100%' }}
                variant="filled"
              />
              <Field
                as={TextField}
                id="address"
                name="address"
                size="medium"
                label="Adresse"
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                sx={{ mb: 2, width: '100%' }}
                variant="filled"
              />
              <Field
                as={TextField}
                id="postalCode"
                name="postalCode"
                size="medium"
                label="Code postal"
                error={touched.postalCode && Boolean(errors.postalCode)}
                helperText={touched.postalCode && errors.postalCode}
                sx={{ mb: 2, width: '100%' }}
                variant="filled"
              />
              <Field
                as={TextField}
                id="city"
                name="city"
                size="medium"
                type="password"
                label="Ville"
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
                sx={{ mb: 2, width: '100%' }}
                variant="filled"
              />
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
                onClick={() => setStep(2)}
              >
                Suivant
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
};

export default SignupStep2;
