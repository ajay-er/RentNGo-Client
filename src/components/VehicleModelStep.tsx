import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { fetchVehicleModels } from '@/services/api';
import { Vehicle } from '@/types';

interface VehicleModelStepProps {
  formData: {
    typeId: number;
  };
  onChange: (newData: any) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  onValidation: (isValid: boolean) => void;
}

const VehicleModelStep: React.FC<VehicleModelStepProps> = ({ formData, onChange, setError, onValidation }) => {
  const [selectedId, setSelectedId] = useState(0);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [vehicleModels, setVehicleModels] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchVehicleModels(formData.typeId);
      if (data.success) {
        setNotFound(false);
        setLoading(false);
        setVehicleModels(data.responseObject);
      } else {
        if (data.statusCode === 404) {
          setNotFound(true);
        } else {
          setNotFound(false);
          setError(data.message);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTypeIdClick = (id: number) => {
    setSelectedId(id);
    onChange({ ...formData, vehicleId: id });
    onValidation(true);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <CircularProgress />
        </div>
      ) : (
        <>
          {notFound ? (
            <p className="text-3xl text-center text-extrabold">No models found.</p>
          ) : (
            <>
              <p className="font-extrabold text-3xl mb-2">Select your vehicle model</p>
              <p>Available vehicle models..</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 h-[200px] overflow-y-auto">
                {vehicleModels.map((type) => (
                  <div
                    key={type.id}
                    className={`relative border-4 hover:opacity-100 opacity-70 cursor-pointer rounded-md h-[50px] flex items-center justify-center ${
                      selectedId === type.id ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    onClick={() => handleTypeIdClick(type.id)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="whitespace-nowrap overflow-hidden max-w-[90%]">{type.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default VehicleModelStep;
