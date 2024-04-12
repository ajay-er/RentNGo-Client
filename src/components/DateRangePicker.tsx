import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React from 'react';

interface DateRangePickerProps {
  formData: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onChange: (newData: any) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  onValidation: (isValid: boolean) => void;
}

const DateRangePickerStep: React.FC<DateRangePickerProps> = ({ formData, onChange, setError, onValidation }) => {
  const today = dayjs().startOf('day');

  const handleDateChange = (date: Date | null, field: string) => {
    if (!date) {
      onChange({ ...formData, [field]: null });
      setError('');
      onValidation(false);
      return;
    }
    if (field === 'startDate' && formData.endDate) {
      if (date > formData.endDate) {
        setError('Start date cannot be after end date');
        onValidation(false);
        return;
      }
    } else if (field === 'endDate' && formData.startDate) {
      if (date < formData.startDate) {
        setError('End date cannot be before start date');
        onValidation(false);
        return;
      }
    }

    onChange({ ...formData, [field]: date });
    setError('');
    onValidation(true);
  };

  const disablePastDates = (day: dayjs.Dayjs) => {
    return day.isBefore(today, 'day');
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
          <DatePicker
            value={formData.startDate ? dayjs(formData.startDate) : null}
            onChange={(date) => handleDateChange(date?.toDate() || null, 'startDate')}
            shouldDisableDate={disablePastDates}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
          <DatePicker
            value={formData.endDate ? dayjs(formData.endDate) : null}
            onChange={(date) => handleDateChange(date?.toDate() || null, 'endDate')}
            shouldDisableDate={disablePastDates}
            minDate={formData.startDate ? dayjs(formData.startDate) : today}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default DateRangePickerStep;
