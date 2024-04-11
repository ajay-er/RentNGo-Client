'use client';

import { Stepper } from '@mui/material';
import React, { useState } from 'react';

import DateRangePicker from '@/components/DateRangePicker';
import NameStep from '@/components/NameStep';
import { steps } from '@/components/Stepper';
import VehicleModelStep from '@/components/VehicleModelStep';
import VehicleTypeStep from '@/components/VehicleTypeStep';
import WheelsStep from '@/components/WheelsStep';

const IndexPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleType: '',
    vehicleModel: '',
    startDate: null,
    endDate: null,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormDataChange = (newData: any) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <NameStep formData={formData} onChange={handleFormDataChange} />;
      case 1:
        return <WheelsStep formData={formData} onChange={handleFormDataChange} />;
      case 2:
        return <VehicleTypeStep formData={formData} onChange={handleFormDataChange} vehicleTypes={[]} />;
      case 3:
        return <VehicleModelStep formData={formData} onChange={handleFormDataChange} vehicleModels={[]} />;
      case 4:
        return <DateRangePicker formData={formData} onChange={handleFormDataChange} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} />
      <div>
        {getStepContent(activeStep)}
        <div>
          {activeStep !== 0 && <button onClick={handleBack}>Back</button>}
          {activeStep !== steps.length - 1 && <button onClick={handleNext}>Next</button>}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
