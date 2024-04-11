import React, { useState } from 'react';

import { Vehicle } from '@/types';

interface VehicleModelStepProps {
  formData: {
    vehicleModel: Vehicle;
  };
  onChange: (newData: any) => void;
  vehicleModels: Vehicle[];
}

const VehicleModelStep: React.FC<VehicleModelStepProps> = ({ formData, onChange, vehicleModels }) => {
  const [selectedId, setSelectedId] = useState(formData.vehicleModel.id);

  const handleTypeIdClick = (id: number) => {
    setSelectedId(id);
    onChange({ vehicleId: id });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {vehicleModels.map((type) => (
        <div
          key={type.id}
          className={`relative border-2 rounded-md overflow-hidden ${
            selectedId === type.id ? 'border-blue-500' : 'border-gray-300'
          }`}
          onClick={() => handleTypeIdClick(type.id)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300"></div>
          <div className="relative z-10 p-4">
            <p>{type.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleModelStep;
