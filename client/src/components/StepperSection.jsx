import {
  Box,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
} from '@mui/material';
import React from 'react';
// mui icons
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EuroIcon from '@mui/icons-material/Euro';
import styled from '@emotion/styled';

const StepperSection = ({ valueArray, step, setStep }) => {
  function ColorlibStepIcon(index) {
    const icons = {
      1: <PersonAddAltIcon />,
      2: <AddLocationAltIcon />,
      3: <EuroIcon />,
    };
    return (
      <Box
        sx={{
          backgroundColor: '#eaeaf0',
          zIndex: 1,
          color: '#fff',
          width: 50,
          height: 50,
          display: 'flex',
          borderRadius: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          ...(step > index && {
            backgroundImage:
              'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
          }),
          ...(step < index && {
            color: 'black',
          }),
          ...(step == index && {
            backgroundImage:
              'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
          }),
        }}
      >
        {icons[index]}
      </Box>
    );
  }
  const ColorlibConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  }));
  return (
    <Stepper
      alternativeLabel
      activeStep={step - 1}
      sx={{
        position: 'absolute',
        width: '100%',
        zIndex: 5,
        top: '10px',
      }}
      connector={<ColorlibConnector />}
    >
      {valueArray.map((label, index) => (
        <Step
          key={index}
          onClick={() => index + 1 < step && setStep(index + 1)}
          sx={{ cursor: 'pointer' }}
        >
          <StepLabel StepIconComponent={() => ColorlibStepIcon(index + 1)}>
            <Typography variant="subtitle1">{label}</Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperSection;
