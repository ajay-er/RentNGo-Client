'use client';

import { Stepper } from '@mui/material';
import Card from '@mui/material/Card';
import React, { useState } from 'react';

import DateRangePicker from '@/components/DateRangePicker';
import NameStep from '@/components/NameStep';
import { steps } from '@/components/Stepper';
import LastStep from '@/components/SuccessStep';
import VehicleModelStep from '@/components/VehicleModelStep';
import VehicleTypeStep from '@/components/VehicleTypeStep';
import WheelsStep from '@/components/WheelsStep';
import { bookVehicle, fetchVehicleModels, fetchVehicleTypes } from '@/services/api';
import { Vehicle, VehicleType } from '@/types';

const Page: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '2',
    vehicleType: { id: 0, typeName: '' },
    vehicleModel: { id: 0, name: '' },
    typeId: 0,
    vehicleId: 0,
    startDate: null,
    endDate: null,
  });
  const [nameFieldsValid, setNameFieldsValid] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [vehicleModels, setVehicleModels] = useState<Vehicle[]>([]);
  const [successOrFail, setSuccessOrFail] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleNext = async () => {
    if (activeStep === 1) {
      const data = await fetchVehicleTypes(+formData.wheels);
      setVehicleTypes(data);
    }

    if (activeStep === 2) {
      const data = await fetchVehicleModels(formData.typeId);
      setVehicleModels(data);
    }

    if (activeStep === 4) {
      const data = await bookVehicle({
        firstName: formData.firstName,
        lastName: formData.lastName,
        vehicleId: formData.vehicleId,
        startDate: formData.startDate,
        endDate: formData.endDate,
      });
      if (data) {
        setSuccessOrFail(true);
        setMessage('Vehicle booked successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          wheels: '2',
          vehicleType: { id: 0, typeName: '' },
          vehicleModel: { id: 0, name: '' },
          typeId: 0,
          vehicleId: 0,
          startDate: null,
          endDate: null,
        });
        setVehicleTypes([]);
        setVehicleModels([]);
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            wheels: '2',
            vehicleType: { id: 0, typeName: '' },
            vehicleModel: { id: 0, name: '' },
            typeId: 0,
            vehicleId: 0,
            startDate: null,
            endDate: null,
          });
          setVehicleTypes([]);
          setVehicleModels([]);
          setActiveStep(0);
        }, 5000);
        return;
      } else {
        setSuccessOrFail(false);
        setMessage('Failed to book vehicle. Please try again.');
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormDataChange = (newData: any) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const handleNameFieldsValidation = (isValid: boolean) => {
    setNameFieldsValid(isValid);
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
        return <VehicleTypeStep formData={formData} onChange={handleFormDataChange} vehicleTypes={vehicleTypes} />;
      case 3:
        return <VehicleModelStep formData={formData} onChange={handleFormDataChange} vehicleModels={vehicleModels} />;
      case 4:
        return <DateRangePicker formData={formData} onChange={handleFormDataChange} />;
      case 5:
        return <LastStep isSuccess={successOrFail} message={message} />;
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
          <button onClick={handleNext} disabled={activeStep === 0 && !nameFieldsValid}>
            Next
          </button>
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
