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
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
// formik
import { Formik, Form, Field } from 'formik';
// yup
import * as Yup from 'yup';
import SignupStep1 from '../components/signup/SignupStep1';
import SignupStep2 from '../components/signup/SignupStep2';
import zIndex from '@mui/material/styles/zIndex';
import StepperSection from '../components/StepperSection';
const Signup = () => {
  const [step, setStep] = useState(1);
  const tab = {
    step1: <SignupStep1 setStep={setStep} />,
    step2: <SignupStep2 setStep={setStep} />,
  };

  const stepsValue = ['Inscription', 'adresse de paiment', 'paiment'];

  return (
    <Box height="100vh">
      {step !== 1 && <StepperSection valueArray={stepsValue} step={step} />}
      {tab[`step${step}`]}
    </Box>
  );
};

export default Signup;
