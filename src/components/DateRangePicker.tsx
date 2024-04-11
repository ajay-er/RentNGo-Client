import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React, { useState } from 'react';

interface DateRangePickerProps {
  formData: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onChange: (newData: any) => void;
}

const DateRangePickerStep: React.FC<DateRangePickerProps> = ({ formData, onChange }) => {
  const [error, setError] = useState<string>(''); // State for validation error message
  const [open, setOpen] = useState<boolean>(false); // State for controlling Snackbar visibility

  const handleDateChange = (date: Date | null, type: string) => {
    if (date && isDateAfterToday(date)) {
      onChange({
        [type]: date,
      });
    } else {
      setError("Selected date must be after today's date");
      setOpen(true);
    }
  };

  const isDateAfterToday = (date: Date) => {
    const today = dayjs();
    return dayjs(date).isAfter(today, 'day');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
          <DatePicker
            value={formData.startDate ? dayjs(formData.startDate) : null}
            onChange={(date) => handleDateChange(date?.toDate() || null, 'startDate')}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
          <DatePicker
            value={formData.endDate ? dayjs(formData.endDate) : null}
            onChange={(date) => handleDateChange(date?.toDate() || null, 'endDate')}
          />
        </div>
      </LocalizationProvider>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default DateRangePickerStep;
