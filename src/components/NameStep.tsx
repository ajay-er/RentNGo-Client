import { TextField } from '@mui/material';
import React, { useState } from 'react';

interface NameStepProps {
  formData: {
    firstName: string;
    lastName: string;
  };
  onChange: (newData: any) => void;
  onValidation: (isValid: boolean) => void;
}

const NameStep: React.FC<NameStepProps> = ({ formData, onChange, onValidation }) => {
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange({ firstName: value });
    if (!value.trim()) {
      setFirstNameError('First name is required');
    } else if (!/^[a-zA-Z ]+$/.test(value)) {
      setFirstNameError('Invalid characters');
    } else {
      setFirstNameError(null);
    }
    validateForm();
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange({ lastName: value });
    if (!value.trim()) {
      setLastNameError('Last name is required');
    } else if (!/^[a-zA-Z ]+$/.test(value)) {
      setLastNameError('Invalid characters');
    } else {
      setLastNameError(null);
    }
    validateForm();
  };

  const validateForm = () => {
    if (!firstNameError && !lastNameError) {
      onValidation(true);
    } else {
      onValidation(false);
    }
  };

  return (
    <div>
      <p className="font-extrabold mb-6 text-4xl">First, What's Your Name?</p>
      <TextField
        type="text"
        value={formData.firstName}
        onChange={handleFirstNameChange}
        placeholder="First Name"
        fullWidth
        label="FIRST NAME"
        error={!!firstNameError}
        helperText={firstNameError}
        sx={{ mb: 4 }}
      />
      <TextField
        type="text"
        value={formData.lastName}
        onChange={handleLastNameChange}
        placeholder="Last Name"
        fullWidth
        label="LAST NAME"
        error={!!lastNameError}
        helperText={lastNameError}
        sx={{ mb: 4 }}
      />
    </div>
  );
};

export default NameStep;
