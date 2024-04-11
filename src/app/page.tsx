'use client';

import { Stepper } from '@mui/material';
import Card from '@mui/material/Card';
import React, { useState } from 'react';

import DateRangePicker from '@/components/DateRangePicker';
import NameStep from '@/components/NameStep';
import { steps } from '@/components/Stepper';
import VehicleModelStep from '@/components/VehicleModelStep';
import VehicleTypeStep from '@/components/VehicleTypeStep';
import WheelsStep from '@/components/WheelsStep';

const Page: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleType: '',
    vehicleModel: '',
    vehicleId: 0,
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
        return <VehicleTypeStep formData={formData} onChange={handleFormDataChange} />;
      case 3:
        return <VehicleModelStep formData={formData} onChange={handleFormDataChange} vehicleModels={[]} />;
      case 4:
        return <DateRangePicker formData={formData} onChange={handleFormDataChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Card className="flex flex-col justify-center items-center min-h-[60%] min-w-[50%]">
        <Stepper activeStep={activeStep} />
        <div>{getStepContent(activeStep)}</div>
      </Card>
      <div className="w-[50%] mt-4 flex justify-between">
        {activeStep !== 0 ? (
          <button onClick={handleBack}>Back</button>
        ) : (
          <button disabled className="cursor-not-allowed opacity-50">
            Back
          </button>
        )}
        {activeStep !== steps.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button disabled className="cursor-not-allowed opacity-50">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
