import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filter from './Filter';
import { getFilterConfig } from '../../api/filter';
import { useAlert } from '../alert/useAlert';

jest.mock('../../api/filter');
jest.mock('../alert/useAlert');


describe('Filter Component', () => {
  const mockShowAlert = jest.fn();
  const mockOnChange = jest.fn();

  beforeEach(() => {
    (useAlert as jest.Mock).mockReturnValue({ showAlert: mockShowAlert });
    (getFilterConfig as jest.Mock).mockResolvedValue([
      {
        type: 'checkboxes',
        name: 'category',
        title: 'Category',
        data: [
          { name: 'option1', title: 'option1', checked: false },
          { name: 'option2', title: 'option2', checked: true },
        ],
      },
      {
        type: 'range',
        name: 'price',
        title: 'Price',
        data: { from: 0, to: 100, value: { from: 10, to: 50 } },
      },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<Filter onChange={mockOnChange} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', async () => {
    (getFilterConfig as jest.Mock).mockRejectedValueOnce(new Error('Error'));
    render(<Filter onChange={mockOnChange} />);
    await waitFor(() => expect(mockShowAlert).toHaveBeenCalledWith('danger', 'Something went wrong'));
    expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
  });

  test('renders filter groups and handles checkbox change', () => {

  });

  test('clears all filters', async () => {
    render(<Filter onChange={mockOnChange} />);
    await waitFor(() => expect(screen.getByText('Category')).toBeInTheDocument());
    const clearButton = screen.getByText('CLEAR ALL FILTERS');
    fireEvent.click(clearButton);
    expect(mockOnChange).toHaveBeenCalledWith([
      {
        type: 'checkboxes',
        name: 'category',
        title: 'Category',
        data: [
          { name: 'option1', title: "option1", checked: false },
          { name: 'option2', title: "option2", checked: true },
        ]
      },
      {
        type: 'range',
        name: 'price',
        title: 'Price',
        data: { from: 0, to: 100, value: { from: 10, to: 50 } },
      },
    ]);
  });
});