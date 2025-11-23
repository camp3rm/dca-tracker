import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateInputProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}
export default function DateInput({ selected, onChange }: DateInputProps) {
	return (
		<DatePicker
			selected={selected}
			onChange={onChange}
			dateFormat={'dd/MM/yyyy'}
			placeholderText="Select a date"
		/>
	);
}
