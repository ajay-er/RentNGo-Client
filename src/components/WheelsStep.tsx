import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

interface WheelsStepProps {
  formData: {
    wheels: number;
  };
  onChange: (newData: any) => void;
}

const WheelsStep: React.FC<WheelsStepProps> = ({ formData, onChange }) => {
  const handleWheelsChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWheels = e.target.value;
    onChange({ ...formData, wheels: newWheels });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <p className="font-extrabold text-4xl mb-4">Select Wheels</p>
      <div className="flex items-center space-x-4">
        <RadioGroup aria-label="wheels" name="wheels" value={formData.wheels} onChange={handleWheelsChange}>
          <FormControlLabel value="2" control={<Radio />} label="2 Wheeler" />
          <FormControlLabel value="4" control={<Radio />} label="4 Wheeler" />
        </RadioGroup>
      </div>
    </div>
  );
};

export default WheelsStep;
