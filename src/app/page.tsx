'use client';

import { Snackbar, Stepper } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';

import DateRangePicker from '@/components/DateRangePicker';
import NameStep from '@/components/NameStep';
import LastStep from '@/components/SuccessStep';
import VehicleModelStep from '@/components/VehicleModelStep';
import VehicleTypeStep from '@/components/VehicleTypeStep';
import WheelsStep from '@/components/WheelsStep';
import { bookVehicle } from '@/services/api';

const Page: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: 2,
    typeId: 0,
    vehicleId: 0,
    startDate: null,
    endDate: null,
  });
  const [nameFieldsValid, setNameFieldsValid] = useState(false);
  const [typeSelection, setTypeSelection] = useState(false);
  const [modelSelection, setModelSelection] = useState(false);
  const [DateSelection, setDateSelection] = useState(false);
  const [error, setError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleNext = async () => {
    if (activeStep === 4) {
      const data = await bookVehicle({
        firstName: formData.firstName,
        lastName: formData.lastName,
        vehicleId: formData.vehicleId,
        startDate: formData.startDate,
        endDate: formData.endDate,
      });
      if (data.success) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        return;
      } else {
        setError(data.message);
        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleFormDataChange = (newData: any) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const handleNameFieldsValidation = (isValid: boolean) => {
    setNameFieldsValid(isValid);
  };

  const handleTypeSelection = (isValid: boolean) => {
    setTypeSelection(isValid);
  };

  const handleModelSelection = (isValid: boolean) => {
    setModelSelection(isValid);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <NameStep formData={formData} onChange={handleFormDataChange} onValidation={handleNameFieldsValidation} />
        );
      case 1:
        return <WheelsStep formData={formData} onChange={handleFormDataChange} />;
      case 2:
        return (
          <VehicleTypeStep
            formData={formData}
            onChange={handleFormDataChange}
            onValidation={handleTypeSelection}
            setError={setError}
          />
        );
      case 3:
        return (
          <VehicleModelStep
            formData={formData}
            onChange={handleFormDataChange}
            onValidation={handleModelSelection}
            setError={setError}
          />
        );
      case 4:
        return (
          <DateRangePicker
            formData={formData}
            onChange={handleFormDataChange}
            setError={setError}
            onValidation={setDateSelection}
          />
        );
      case 5:
        return <LastStep />;
      default:
        return null;
    }
  };

  return (
    <>
      {error && (
        <Snackbar key={error} open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </MuiAlert>
        </Snackbar>
      )}
      <div className="h-screen flex flex-col justify-center items-center">
        <Card className="flex flex-col p-4 items-center h-1/2 w-1/2">
          <Stepper activeStep={activeStep} />
          <div>{getStepContent(activeStep)}</div>
        </Card>
        <div className="w-[50%] mt-4 flex justify-between">
          <button
            className={`text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full ${
              (activeStep === 0 && !nameFieldsValid) ||
              (activeStep === 2 && !typeSelection) ||
              (activeStep === 3 && !modelSelection) ||
              (activeStep === 4 && !DateSelection)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !nameFieldsValid) ||
              (activeStep === 2 && !typeSelection) ||
              (activeStep === 3 && !modelSelection) ||
              (activeStep === 4 && !DateSelection) ||
              activeStep === 5
            }
          >
            {activeStep === 5 ? '✅' : activeStep === 4 ? 'Book' : 'Next'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
