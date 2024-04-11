import React from 'react';

interface VehicleTypeStepProps {
  formData: {
    vehicleType: string;
  };
  onChange: (newData: any) => void;
  vehicleTypes: string[]; // This should be fetched from the database
}

const VehicleTypeStep: React.FC<VehicleTypeStepProps> = ({ formData, onChange, vehicleTypes }) => {
  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ vehicleType: e.target.value });
  };

  return (
    <div>
      {vehicleTypes.map((type) => (
        <label key={type}>
          <input type="radio" value={type} checked={formData.vehicleType === type} onChange={handleVehicleTypeChange} />
          {type}
        </label>
      ))}
      <div>hello</div>
    </div>
  );
};

export default VehicleTypeStep;
