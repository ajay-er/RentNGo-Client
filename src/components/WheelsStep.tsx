import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';

interface WheelsStepProps {
  formData: {
    wheels: string;
  };
  onChange: (newData: any) => void;
}

const WheelsStep: React.FC<WheelsStepProps> = ({ formData, onChange }) => {
  const [selectedWheels, setSelectedWheels] = useState(formData.wheels);

  const handleWheelsChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWheels = e.target.value;
    setSelectedWheels(newWheels);
    onChange({ wheels: newWheels });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <p className="font-extrabold text-4xl mb-4">Select Wheels</p>
      <div className="flex items-center space-x-4">
        <RadioGroup aria-label="wheels" name="wheels" value={selectedWheels} onChange={handleWheelsChange}>
          <FormControlLabel value="2" control={<Radio />} label="2 Wheeler" />
          <FormControlLabel value="4" control={<Radio />} label="4 Wheeler" />
        </RadioGroup>
      </div>
    </div>
  );
};

export default WheelsStep;
