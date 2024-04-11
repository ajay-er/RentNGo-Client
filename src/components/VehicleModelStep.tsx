import React from 'react';

interface VehicleModelStepProps {
  formData: {
    vehicleModel: string;
  };
  onChange: (newData: any) => void;
  vehicleModels: string[]; // This should be fetched from the database based on vehicle type
}

const VehicleModelStep: React.FC<VehicleModelStepProps> = ({ formData, onChange, vehicleModels }) => {
  const handleVehicleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ vehicleModel: e.target.value });
  };

  return (
    <div>
      {vehicleModels.map((model) => (
        <label key={model}>
          <input
            type="radio"
            value={model}
            checked={formData.vehicleModel === model}
            onChange={handleVehicleModelChange}
          />
          {model}
        </label>
      ))}

      <div>hello</div>
    </div>
  );
};

export default VehicleModelStep;
