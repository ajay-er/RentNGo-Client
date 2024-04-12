import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { fetchVehicleTypes } from '@/services/api';
import { VehicleType } from '@/types';

interface VehicleTypeStepProps {
  formData: {
    typeId: number;
    wheels: number;
  };
  onChange: (newData: any) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  onValidation: (isValid: boolean) => void;
}

const VehicleTypeStep: React.FC<VehicleTypeStepProps> = ({ formData, onChange, setError, onValidation }) => {
  const [selectedId, setSelectedId] = useState(formData.typeId);
  const [loading, setLoading] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchVehicleTypes(formData.wheels);
      if (data.success) {
        setLoading(false);
        setVehicleTypes(data.responseObject);
      } else {
        setError(data.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTypeIdClick = (typeId: number) => {
    onChange({ ...formData, typeId });
    setSelectedId(typeId);
    onValidation(true);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <CircularProgress />
        </div>
      ) : (
        <>
          <p className="font-extrabold text-3xl mb-2">Select your type of vehicle?</p>
          <p>Available {formData.wheels === 2 ? 'Bike' : 'Car'} types..</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 h-[200px] overflow-y-auto">
            {vehicleTypes.map((type) => (
              <div
                key={type.id}
                className={`relative border-4 hover:opacity-100 opacity-70 cursor-pointer rounded-md h-[50px] flex items-center justify-center ${
                  selectedId === type.id ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => handleTypeIdClick(type.id)}
              >
                <div className="absolute inset-0 text-center p-2 bg-gradient-to-br from-gray-200 to-gray-300">
                  <p className="whitespace-nowrap overflow-hidden max-w-[90%]">{type.typeName}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VehicleTypeStep;
