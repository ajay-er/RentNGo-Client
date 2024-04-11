import React from 'react';

interface LastStepProps {
  isSuccess: boolean;
  message: string;
}

const LastStep: React.FC<LastStepProps> = ({ isSuccess, message }) => {
  return (
    <div className={`text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
      <p>{message}</p>
    </div>
  );
};

export default LastStep;
