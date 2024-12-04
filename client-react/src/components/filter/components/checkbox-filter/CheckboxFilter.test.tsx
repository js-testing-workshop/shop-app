import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxFilter from './CheckboxFilter';
import { CheckboxesFilterConfig } from '../../../../api/filter';

const mockOptions: CheckboxesFilterConfig['data'] = [
  { name: 'option1', title: 'Option 1', checked: false },
  { name: 'option2', title: 'Option 2', checked: true },
];

const mockOnCheckboxChange = jest.fn();

describe('CheckboxFilter Component', () => {
  it('renders checkbox options correctly', () => {
    render(<CheckboxFilter options={mockOptions} onCheckboxChange={mockOnCheckboxChange} />);

    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('checkboxes have correct initial state', () => {
    render(<CheckboxFilter options={mockOptions} onCheckboxChange={mockOnCheckboxChange} />);

    expect(screen.getByLabelText('Option 1')).not.toBeChecked();
    expect(screen.getByLabelText('Option 2')).toBeChecked();
  });

  it('calls onCheckboxChange when checkbox is clicked', () => {
    render(<CheckboxFilter options={mockOptions} onCheckboxChange={mockOnCheckboxChange} />);

    const checkbox1 = screen.getByLabelText('Option 1');
    fireEvent.click(checkbox1);
    expect(mockOnCheckboxChange).toHaveBeenCalledWith('option1', true);

    const checkbox2 = screen.getByLabelText('Option 2');
    fireEvent.click(checkbox2);
    expect(mockOnCheckboxChange).toHaveBeenCalledWith('option2', false);
  });
});