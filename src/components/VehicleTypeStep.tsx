import React, { useState } from 'react';

import { VehicleType } from '@/types';

interface VehicleTypeStepProps {
  formData: {
    vehicleType: VehicleType;
  };
  onChange: (newData: any) => void;
  vehicleTypes: VehicleType[];
}

const VehicleTypeStep: React.FC<VehicleTypeStepProps> = ({ formData, onChange, vehicleTypes }) => {
  const [selectedId, setSelectedId] = useState(formData.vehicleType.typeId);

  const handleTypeIdClick = (typeId: number) => {
    onChange({ typeId });
    setSelectedId(typeId);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {vehicleTypes.map((type) => (
        <div
          key={type.typeId}
          className={`relative border-2 rounded-md overflow-hidden ${
            selectedId === type.typeId ? 'border-blue-500' : 'border-gray-300'
          }`}
          onClick={() => handleTypeIdClick(type.typeId)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
          <div className="relative z-10 p-4">
            <p>{type.typeName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleTypeStep;
