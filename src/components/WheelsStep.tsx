import React from 'react';

interface WheelsStepProps {
  formData: {
    wheels: string;
  };
  onChange: (newData: any) => void;
}

const WheelsStep: React.FC<WheelsStepProps> = ({ formData, onChange }) => {
  const handleWheelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ wheels: e.target.value });
  };

  return (
    <div>
      <label>
        <input type="radio" value="2" checked={formData.wheels === '2'} onChange={handleWheelsChange} />2 Wheels
      </label>
      <label>
        <input type="radio" value="4" checked={formData.wheels === '4'} onChange={handleWheelsChange} />4 Wheels
      </label>
    </div>
  );
};

export default WheelsStep;
