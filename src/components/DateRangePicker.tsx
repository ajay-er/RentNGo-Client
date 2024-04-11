import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React from 'react';

interface DateRangePickerProps {
  formData: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onChange: (newData: any) => void;
}

const DateRangePickerStep: React.FC<DateRangePickerProps> = ({ formData, onChange }) => {
  const handleDateChange = (newDates: Date[]) => {
    onChange({
      startDate: newDates[0],
      endDate: newDates[1],
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Start Date"
        endText="End Date"
        value={[formData.startDate, formData.endDate]}
        onChange={(newValue: any) => handleDateChange(newValue as Date[])}
        renderInput={(startProps: any, endProps: any) => (
          <React.Fragment>
            <input {...startProps.inputProps} />
            <input {...endProps.inputProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
};

export default DateRangePickerStep;
