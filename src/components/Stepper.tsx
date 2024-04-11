import { Step, StepLabel, Stepper as MUIStepper } from '@mui/material';
import React from 'react';

interface StepperProps {
  activeStep: number;
}

export const steps = ['Name', 'Number of Wheels', 'Type of Vehicle', 'Specific Model', 'Date Range'];

const Stepper: React.FC<StepperProps> = ({ activeStep }) => {
  return (
    <MUIStepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </MUIStepper>
  );
};

export default Stepper;
