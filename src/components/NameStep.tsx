import React from 'react';

interface NameStepProps {
  formData: {
    firstName: string;
    lastName: string;
  };
  onChange: (newData: any) => void;
}

const NameStep: React.FC<NameStepProps> = ({ formData, onChange }) => {
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ firstName: e.target.value });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ lastName: e.target.value });
  };

  return (
    <div>
      <input type="text" value={formData.firstName} onChange={handleFirstNameChange} placeholder="First Name" />
      <input type="text" value={formData.lastName} onChange={handleLastNameChange} placeholder="Last Name" />
    </div>
  );
};

export default NameStep;
